package com.example.Alz.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Alz.Entities.Demantia;
import com.example.Alz.Entities.Guardian;
import com.example.Alz.Repositories.DemantiaRepository;
import com.example.Alz.Repositories.GuardianRepository;

@RestController
@RequestMapping("/auth")
public class AuthController {

  @Autowired
  private BCryptPasswordEncoder bCryptPasswordEncoder;
  @Autowired
  private GuardianRepository guardianRepository;
  @Autowired
  private DemantiaRepository demantiaRepository;

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
      Demantia DbDemantia = demantiaRepository.findByEmail(guardian.getEmail());
      if (DbDemantia != null) {
        if (bCryptPasswordEncoder.matches(guardian.getPassword(), DbDemantia.getPassword())) {
          return new ResponseEntity(DbDemantia, HttpStatus.OK);
        } else {
          return new ResponseEntity("Wrong Info", HttpStatus.FORBIDDEN);
        }
      }

    }
    return new ResponseEntity("Wrong Info", HttpStatus.OK);
  }

  }
