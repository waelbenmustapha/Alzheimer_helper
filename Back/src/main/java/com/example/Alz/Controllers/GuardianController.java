package com.example.Alz.Controllers;

import java.math.BigDecimal;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Alz.Entities.Guardian;
import com.example.Alz.Repositories.DementiaRepository;
import com.example.Alz.Repositories.GuardianRepository;

@RestController
@RequestMapping("/guardian")
public class GuardianController {

  @Autowired
  private BCryptPasswordEncoder bCryptPasswordEncoder;


  @Autowired
  private DementiaRepository dementiaRepository;

  @Autowired
  private GuardianRepository guardianRepository;

  @PostMapping("/create")
  public ResponseEntity CreateGuardian(@RequestBody Guardian guardian) {
    guardianRepository.save(guardian);
    return new ResponseEntity("Saved", HttpStatus.OK);
  }

  @PostMapping("SignUp")
  public ResponseEntity SignUpGuardian(@RequestBody Guardian guardian) {

    Boolean emailnotexist = guardianRepository.findByEmail(guardian.getEmail()) == null;

    if (emailnotexist) {
      guardian.setPassword(bCryptPasswordEncoder.encode(guardian.getPassword()));
      guardianRepository.save(guardian);
      return new ResponseEntity("Signup successful", HttpStatus.OK);
    } else {
      return new ResponseEntity("Email Already exist", HttpStatus.IM_USED);
    }

  }



  @GetMapping("/getMyDementiaLocation/{gid}")
  public ResponseEntity getMyDemantiaLocation(@PathVariable("gid") String gid) {

    Guardian guardian = guardianRepository.findById(gid).get();
    HashMap<String, BigDecimal> map = new HashMap<String, BigDecimal>();

    map.put("latitude", guardian.getDementia().getLatitude());
    map.put("longitude", guardian.getDementia().getLongitude());

    return new ResponseEntity(map, HttpStatus.OK);

  }


  @GetMapping("/get")
  public ResponseEntity findguardians() {
    return new ResponseEntity(guardianRepository.findAll(), HttpStatus.OK);
  }

  @GetMapping("/get/{Gid}")
  public ResponseEntity getGuardianbyid(@PathVariable("Gid") String gid) {
    return new ResponseEntity(guardianRepository.findById(gid), HttpStatus.OK);
  }


  @PostMapping("/adddem/{gid}/{did}")
  public ResponseEntity adddem(@PathVariable("gid") String gid, @PathVariable("did") String did) {
    Guardian guardiantochange = guardianRepository.findById(gid).get();
    guardiantochange.setDementia(dementiaRepository.findById(did).get());
    guardianRepository.save(guardiantochange);
    return new ResponseEntity("good", HttpStatus.OK);
  }
}
