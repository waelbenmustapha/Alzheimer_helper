package com.example.Alz.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
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

  @PostMapping("/login")
  public ResponseEntity login(@RequestBody Guardian guardian) {

    Guardian DbGuardian = guardianRepository.findByEmail(guardian.getEmail());
    if (DbGuardian != null) {
      if (bCryptPasswordEncoder.matches(guardian.getPassword(), DbGuardian.getPassword())) {
        return new ResponseEntity(DbGuardian, HttpStatus.OK);
      } else {
        return new ResponseEntity("Wrong Info", HttpStatus.FORBIDDEN);
      }

    } else {
      Dementia dbDementia = dementiaRepository.findByEmail(guardian.getEmail());
      if (dbDementia != null) {
        if (bCryptPasswordEncoder.matches(guardian.getPassword(), dbDementia.getPassword())) {
          return new ResponseEntity(dbDementia, HttpStatus.OK);
        } else {
          return new ResponseEntity("Wrong Info", HttpStatus.FORBIDDEN);
        }
      }

    }
    return new ResponseEntity("Wrong Info", HttpStatus.FORBIDDEN);
  }

  }
