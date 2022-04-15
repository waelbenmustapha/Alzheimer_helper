package com.example.Alz.Controllers;

import java.io.UnsupportedEncodingException;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Alz.Entities.Dementia;
import com.example.Alz.Entities.Guardian;
import com.example.Alz.Repositories.DementiaRepository;
import com.example.Alz.Repositories.GuardianRepository;

import net.bytebuddy.utility.RandomString;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {

  private JavaMailSender mailSender;
  @Autowired
  private BCryptPasswordEncoder bCryptPasswordEncoder;
  @Autowired
  private GuardianRepository guardianRepository;
  @Autowired
  private DementiaRepository dementiaRepository;

  //login while saving pushtoken ( notification token )
  @PostMapping("/login/{pushtoken}")
  public ResponseEntity login(@RequestBody Guardian guardian, @PathVariable("pushtoken") String pushtoken) {

    Guardian DbGuardian = guardianRepository.findByEmail(guardian.getEmail());
    //check if user is a guardian
    if (DbGuardian != null) {
      if (DbGuardian.getVerified() == true) {
        if (bCryptPasswordEncoder.matches(guardian.getPassword(), DbGuardian.getPassword())) {
          DbGuardian.setPushToken(pushtoken);
          guardianRepository.save(DbGuardian);

          //When login success

          return new ResponseEntity(DbGuardian, HttpStatus.OK);
        } else {

          //When login fails

          return new ResponseEntity("Wrong Info", HttpStatus.FORBIDDEN);
        }
      } else {

        //If account is not verified

        return new ResponseEntity("Account Not verified", HttpStatus.UNAUTHORIZED);

      }
    } else {

      //if user is Dementia

      Dementia dbDementia = dementiaRepository.findByEmail(guardian.getEmail());
      if (dbDementia != null) {
        if (dbDementia.getVerified() == true) {
          if (bCryptPasswordEncoder.matches(guardian.getPassword(), dbDementia.getPassword())) {
            dbDementia.setPushToken(pushtoken);
            dementiaRepository.save(dbDementia);
            return new ResponseEntity(dbDementia, HttpStatus.OK);
          } else {

            //login sucess

            return new ResponseEntity("Wrong Info", HttpStatus.FORBIDDEN);
          }
        } else {

          //login fail

          return new ResponseEntity("Account Not verified", HttpStatus.UNAUTHORIZED);

        }
      }
    }

    //if none of the above wrong info

    return new ResponseEntity("Wrong Info", HttpStatus.FORBIDDEN);
  }

  @PostMapping("/verify/{verificationcode}")
  public ResponseEntity login(@PathVariable("verificationcode") String verifcode) {

    //Find the unique verification code on the DB if it's a guardian or a user

    Guardian DbGuardian = guardianRepository.findByVerificationCode(verifcode);
    if (DbGuardian != null) {

      //Set verified to true for that user

      DbGuardian.setVerified(true);

      //Empty the verification code so it can't be used again

      DbGuardian.setVerificationCode(null);
      guardianRepository.save(DbGuardian);
      return new ResponseEntity("Verifted", HttpStatus.OK);

    } else {

      //if the user is a dementia

      Dementia dbDementia = dementiaRepository.findByVerificationCode(verifcode);
      if (dbDementia != null) {
        dbDementia.setVerified(true);
        dbDementia.setVerificationCode(null);
        dementiaRepository.save(dbDementia);
        return new ResponseEntity("Verifted", HttpStatus.OK);

      }
    }

    //if verification code doesn't exist

    return new ResponseEntity("Wrong verification Code", HttpStatus.UNAUTHORIZED);

  }

  @PostMapping("/forgot-password/{email}")
  public ResponseEntity forgot(@PathVariable("email") String email) throws UnsupportedEncodingException, MessagingException {

    //find user by email

    Guardian DbGuardian = guardianRepository.findByEmail(email);

    //If it's a guardian

    if (DbGuardian != null) {

      //Create a new verification code and send it to that email

      DbGuardian.setVerificationCode(RandomString.make(6));
      guardianRepository.save(DbGuardian);
      sendVerificationEmail(DbGuardian.getVerificationCode(), DbGuardian.getEmail(), DbGuardian.getName());
      return new ResponseEntity("sent", HttpStatus.OK);

    } else {

      // Create a new Verification and send it to that email
      Dementia dbDementia = dementiaRepository.findByEmail(email);
      if (dbDementia != null) {
        DbGuardian.setVerificationCode(RandomString.make(6));
        dementiaRepository.save(dbDementia);
        sendVerificationEmail(dbDementia.getVerificationCode(), dbDementia.getEmail(), dbDementia.getName());
        return new ResponseEntity("ok", HttpStatus.OK);

      }
    }

    //if email doesn't exist

    return new ResponseEntity("email does not exist", HttpStatus.FORBIDDEN);

  }

  @PutMapping("/change-password/{email}")
  public ResponseEntity changepassword(@PathVariable("email") String email, @RequestBody String password) {


    Guardian DbGuardian = guardianRepository.findByEmail(email);
    if (DbGuardian != null) {

      DbGuardian.setPassword(bCryptPasswordEncoder.encode(password));
      guardianRepository.save(DbGuardian);
      return new ResponseEntity("changed", HttpStatus.OK);

    } else {
      Dementia dbDementia = dementiaRepository.findByEmail(email);
      if (dbDementia != null) {
        dbDementia.setPassword(bCryptPasswordEncoder.encode(password));
        dementiaRepository.save(dbDementia);

        return new ResponseEntity("changed", HttpStatus.OK);

      }
    }
    return new ResponseEntity("email does not exist", HttpStatus.FORBIDDEN);

  }

  private void sendVerificationEmail(String link, String email, String username)
      throws MessagingException, UnsupportedEncodingException {

    String toAddress = email;
    String fromAddress = "Alzh@application.tn";
    String senderName = "Alzheimer Helper";
    String subject = "Your password recovery code";

    //Create email form with the username and the Verification code

    String content = emailform(username, link);

    MimeMessage message = mailSender.createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(message);

    helper.setFrom(fromAddress, senderName);
    helper.setTo(toAddress);
    helper.setSubject(subject);

    //so the form is in HTML

    helper.setText(content, true);

    mailSender.send(message);

    System.out.println("Email has been sent");

  }

  private String emailform(String name, String link) {
    return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n" +
        "\n" +
        "<span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span>\n" +
        "\n" +
        "  <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;min-width:100%;width:100%!important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n"
        +
        "    <tbody><tr>\n" +
        "      <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n" +
        "        \n" +
        "        <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n"
        +
        "          <tbody><tr>\n" +
        "            <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n" +
        "                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
        "                  <tbody><tr>\n" +
        "                    <td style=\"padding-left:10px\">\n" +
        "                  \n" +
        "                    </td>\n" +
        "                    <td style=\"font-size:28px;line-height:1.315789474;Margin-top:4px;padding-left:10px\">\n" +
        "                      <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">Confirm your email</span>\n"
        +
        "                    </td>\n" +
        "                  </tr>\n" +
        "                </tbody></table>\n" +
        "              </a>\n" +
        "            </td>\n" +
        "          </tr>\n" +
        "        </tbody></table>\n" +
        "        \n" +
        "      </td>\n" +
        "    </tr>\n" +
        "  </tbody></table>\n" +
        "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n"
        +
        "    <tbody><tr>\n" +
        "      <td width=\"10\" height=\"10\" valign=\"middle\"></td>\n" +
        "      <td>\n" +
        "        \n" +
        "                <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n"
        +
        "                  <tbody><tr>\n" +
        "                    <td bgcolor=\"#1D70B8\" width=\"100%\" height=\"10\"></td>\n" +
        "                  </tr>\n" +
        "                </tbody></table>\n" +
        "        \n" +
        "      </td>\n" +
        "      <td width=\"10\" valign=\"middle\" height=\"10\"></td>\n" +
        "    </tr>\n" +
        "  </tbody></table>\n" +
        "\n" +
        "\n" +
        "\n" +
        "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n"
        +
        "    <tbody><tr>\n" +
        "      <td height=\"30\"><br></td>\n" +
        "    </tr>\n" +
        "    <tr>\n" +
        "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
        "      <td style=\"font-family:Helvetica,Arial,sans-serif;font-size:19px;line-height:1.315789474;max-width:560px\">\n" +
        "        \n" +
        "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Hi " + name
        + ",</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">  Please copy the below code to recover your account: </p><blockquote style=\"Margin:0 0 20px 0;border-left:10px solid #b1b4b6;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\"><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> <p>"
        + link + "</a> </p></blockquote>\n <p>See you soon</p>" +
        "        \n" +
        "      </td>\n" +
        "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
        "    </tr>\n" +
        "    <tr>\n" +
        "      <td height=\"30\"><br></td>\n" +
        "    </tr>\n" +
        "  </tbody></table><div class=\"yj6qo\"></div><div class=\"adL\">\n" +
        "\n" +
        "</div></div>";
  }
}
