package com.example.Alz.Controllers;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.util.List;

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

import com.example.Alz.Entities.Dementia;
import com.example.Alz.Entities.Guardian;
import com.example.Alz.Entities.SafeZone;
import com.example.Alz.Repositories.DementiaRepository;
import com.example.Alz.Repositories.GuardianRepository;
import com.example.Alz.Repositories.SafeZoneRepository;

import net.bytebuddy.utility.RandomString;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/dementia")
@AllArgsConstructor
public class DementiaController {

  private JavaMailSender mailSender;

  @Autowired
  private DementiaRepository dementiaRepository;
  @Autowired
  private GuardianRepository guardianRepository;
  @Autowired
  private SafeZoneRepository safeZoneRepository;
  @Autowired
  private BCryptPasswordEncoder bCryptPasswordEncoder;

  //Save user current latitude and longitude
  @PostMapping("/post-location/{demid}/{latitude}/{longitude}")
  public ResponseEntity postlocation(@PathVariable("demid") String demid, @PathVariable("latitude") BigDecimal latitude,
      @PathVariable("longitude") BigDecimal longitude) {
    Dementia dementia = dementiaRepository.findById(demid).get();
    dementia.setLatitude(latitude);
    dementia.setLongitude(longitude);
    dementiaRepository.save(dementia);
    return new ResponseEntity("Position Updated", HttpStatus.OK);

  }

  @PutMapping("/edit-profile/{dim}")
  public ResponseEntity editprofile(@PathVariable("dim") String id, @RequestBody Dementia dementia) {

    dementia.setId(dementiaRepository.findById(id).get().getId());
    dementiaRepository.save(dementia);
    return new ResponseEntity("edited", HttpStatus.OK);

  }

  //find Guardian push token so he can send him a notification
  @GetMapping("/guardian-push-token/{dim}")
  public ResponseEntity getguardianpustoken(@PathVariable("dim") String id) {

    return new ResponseEntity(dementiaRepository.findById(id).get().getGuardian().getPushToken(), HttpStatus.OK);

  }

  //find Guardian phone nmber
  @GetMapping("/guardian-phone-number/{dim}")
  public ResponseEntity getguardiannumber(@PathVariable("dim") String id) {

    return new ResponseEntity(dementiaRepository.findById(id).get().getGuardian().getPhoneNumber(), HttpStatus.OK);

  }

  @PostMapping("/SignUp/{email}")
  public ResponseEntity create(@RequestBody Dementia dementia, @PathVariable("email") String email)
      throws UnsupportedEncodingException, MessagingException {

    Guardian guardian = guardianRepository.findByEmail(email);

    //if the guardian exists

    if (guardian != null) {

      //if email not already used

      if (dementiaRepository.findByEmail(dementia.getEmail()) == null) {
        dementia.setGuardian(guardian);
        guardian.setDementia(dementia);
        dementia.setVerificationCode(RandomString.make(6));
        dementia.setPassword(bCryptPasswordEncoder.encode(dementia.getPassword()));
        dementiaRepository.save(dementia);
        guardianRepository.save(guardian);
        sendVerificationEmail(dementia);

        return new ResponseEntity("Signup successful", HttpStatus.OK);
      } else {

        return new ResponseEntity("Email Already exist", HttpStatus.IM_USED);
      }
    } else {
      return new ResponseEntity("Guardian Does not exist", HttpStatus.NOT_FOUND);

    }
  }

  //Add a safezone to the dementia safezone list
  @PostMapping("/safezone/{demid}")
  public ResponseEntity safezone(@RequestBody SafeZone safezone, @PathVariable("demid") String demid) {
    Dementia dementia = dementiaRepository.findById(demid).get();
    safezone.setDementia(dementia);
    safeZoneRepository.save(safezone);
    return new ResponseEntity("All good", HttpStatus.OK);
  }

  //get dementia safezone
  @GetMapping("/get-safezones/{demid}")
  public ResponseEntity safezone(@PathVariable("demid") String demid) {

    return new ResponseEntity(dementiaRepository.findById(demid).get().getSafeZone(), HttpStatus.OK);

  }

  //enable a safezone
  @PostMapping("/enable-safezone/{dim}/{safezoneid}")
  public ResponseEntity enableSafezone(@PathVariable("dim") String demid, @PathVariable("safezoneid") String safezoneid) {

    List<SafeZone> safezones = dementiaRepository.findById(demid).get().getSafeZone();
    for (int i = 0; i < safezones.size(); i++) {
      safezones.get(i).setActive(false);
      safeZoneRepository.save(safezones.get(i));
    }
    SafeZone ss = safeZoneRepository.findById(safezoneid).get();
    ss.setActive(true);
    safeZoneRepository.save(ss);
    return new ResponseEntity("done", HttpStatus.OK);
  }

  private void sendVerificationEmail(Dementia dementia)
      throws MessagingException, UnsupportedEncodingException {

    String toAddress = dementia.getEmail();
    String fromAddress = "Alzh@application.tn";
    String link = dementia.getVerificationCode();
    String senderName = "Alzheimer Helper";
    String username = dementia.getName();
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
