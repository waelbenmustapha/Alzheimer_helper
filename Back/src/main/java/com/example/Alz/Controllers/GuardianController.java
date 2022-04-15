package com.example.Alz.Controllers;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.util.HashMap;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Alz.Entities.Guardian;
import com.example.Alz.Repositories.DementiaRepository;
import com.example.Alz.Repositories.GuardianRepository;

import net.bytebuddy.utility.RandomString;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/guardian")
@AllArgsConstructor
public class GuardianController {

  @Autowired
  private BCryptPasswordEncoder bCryptPasswordEncoder;
  private JavaMailSender mailSender;


  @Autowired
  private DementiaRepository dementiaRepository;

  @Autowired
  private GuardianRepository guardianRepository;


  @PostMapping("SignUp")
  public ResponseEntity SignUpGuardian(@RequestBody Guardian guardian) throws UnsupportedEncodingException, MessagingException {

    Boolean emailnotexist = guardianRepository.findByEmail(guardian.getEmail()) == null;

    //check if email not already used

    if (emailnotexist) {
      guardian.setPassword(bCryptPasswordEncoder.encode(guardian.getPassword()));
      guardian.setVerificationCode(RandomString.make(6));
      guardianRepository.save(guardian);
      sendVerificationEmail(guardian);
      return new ResponseEntity("Signup successful", HttpStatus.OK);
    } else {
      return new ResponseEntity("Email Already exist", HttpStatus.IM_USED);
    }

  }

  //get dementia latest location saved
  @GetMapping("/getMyDementiaLocation/{gid}")
  public ResponseEntity getMyDemantiaLocation(@PathVariable("gid") String gid) {

    Guardian guardian = guardianRepository.findById(gid).get();
    HashMap<String, BigDecimal> map = new HashMap<String, BigDecimal>();

    //add latitude and longitude in a hasmap
    map.put("latitude", guardian.getDementia().getLatitude());
    map.put("longitude", guardian.getDementia().getLongitude());

    return new ResponseEntity(map, HttpStatus.OK);

  }

  //Add pin code for dementia
  @PostMapping("/add-pin-code/{gid}/{pincode}")
  public ResponseEntity addpincode(@PathVariable("gid") String id, @PathVariable("pincode") String code) {
    Guardian guardian = guardianRepository.findById(id).get();
    guardian.setPinCode(code);
    guardianRepository.save(guardian);
    return new ResponseEntity("pin added", HttpStatus.OK);
  }

  //test if entered pin code is correct
  @GetMapping("/test-pin/{gid}/{pincode}")
  public ResponseEntity testpincode(@PathVariable("gid") String id, @PathVariable("pincode") String code) {
    Guardian guardian = guardianRepository.findById(id).get();
    if (code.equals(guardian.getPinCode())) {
      return new ResponseEntity(true, HttpStatus.OK);
    } else {
      return new ResponseEntity(false, HttpStatus.OK);

    }

  }

  @GetMapping("/get/{Gid}")
  public ResponseEntity getGuardianbyid(@PathVariable("Gid") String gid) {
    return new ResponseEntity(guardianRepository.findById(gid), HttpStatus.OK);
  }


  private void sendVerificationEmail(Guardian guardian)
      throws MessagingException, UnsupportedEncodingException {

    String toAddress = guardian.getEmail();
    String fromAddress = "Alzh@application.tn";
    String link = guardian.getVerificationCode();
    String senderName = "Alzheimer Helper";
    String username = guardian.getName();
    String subject = "Please verify your registration";
    String content = emailform(username, link);

    MimeMessage message = mailSender.createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(message);

    helper.setFrom(fromAddress, senderName);
    helper.setTo(toAddress);
    helper.setSubject(subject);

    helper.setText(content, true);

    mailSender.send(message);

    System.out.println("Email has been sent");

  }

  @PutMapping("/edit-profile/{gid}")
  public ResponseEntity editprofile(@PathVariable("gid") String id, @RequestBody Guardian guardian) {

    guardian.setId(guardianRepository.findById(id).get().getId());
    guardianRepository.save(guardian);
    return new ResponseEntity("edited", HttpStatus.OK);

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
        + ",</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> Thank you for registering. Please copy the below code to activate your account: </p><blockquote style=\"Margin:0 0 20px 0;border-left:10px solid #b1b4b6;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\"><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> <p>"
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
