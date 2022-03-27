package com.example.Alz.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

@RestController
@RequestMapping("/auth")
public class AuthController {

  @Autowired
  private BCryptPasswordEncoder bCryptPasswordEncoder;
  @Autowired
  private GuardianRepository guardianRepository;
  @Autowired
  private DementiaRepository dementiaRepository;

  @PostMapping("/login/{pushtoken}")
  public ResponseEntity login(@RequestBody Guardian guardian, @PathVariable("pushtoken") String pushtoken) {

    Guardian DbGuardian = guardianRepository.findByEmail(guardian.getEmail());
    if (DbGuardian != null) {
      if (DbGuardian.getVerified() == true) {
        if (bCryptPasswordEncoder.matches(guardian.getPassword(), DbGuardian.getPassword())) {
          DbGuardian.setPushToken(pushtoken);
          guardianRepository.save(DbGuardian);
          return new ResponseEntity(DbGuardian, HttpStatus.OK);
        } else {
          return new ResponseEntity("Wrong Info", HttpStatus.FORBIDDEN);
        }
      } else {
        return new ResponseEntity("Account Not verified", HttpStatus.UNAUTHORIZED);

      }
    } else {
      Dementia dbDementia = dementiaRepository.findByEmail(guardian.getEmail());
      if (dbDementia != null) {
        if (dbDementia.getVerified() == true) {
          if (bCryptPasswordEncoder.matches(guardian.getPassword(), dbDementia.getPassword())) {
            dbDementia.setPushToken(pushtoken);
            dementiaRepository.save(dbDementia);
            return new ResponseEntity(dbDementia, HttpStatus.OK);
          } else {
            return new ResponseEntity("Wrong Info", HttpStatus.FORBIDDEN);
          }
        } else {
          return new ResponseEntity("Account Not verified", HttpStatus.UNAUTHORIZED);

        }
      }
    }
    return new ResponseEntity("Wrong Info", HttpStatus.FORBIDDEN);
  }

  @PostMapping("/verify/{verificationcode}")
  public ResponseEntity login(@PathVariable("verificationcode") String verifcode)
  { Guardian DbGuardian = guardianRepository.findByVerificationCode(verifcode);
    if (DbGuardian != null) {
     DbGuardian.setVerified(true);
     guardianRepository.save(DbGuardian);
      return new ResponseEntity("Verifted", HttpStatus.OK);

    } else {
      Dementia dbDementia = dementiaRepository.findByVerificationCode(verifcode);
      if (dbDementia != null) {
       dbDementia.setVerified(true);
       dementiaRepository.save(dbDementia);
        return new ResponseEntity("Verifted", HttpStatus.OK);

      }
    }
    return new ResponseEntity("Wrong verification Code", HttpStatus.UNAUTHORIZED);

  }

}
