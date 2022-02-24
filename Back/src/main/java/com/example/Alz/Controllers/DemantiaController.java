package com.example.Alz.Controllers;

import java.math.BigDecimal;

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

import com.example.Alz.Dto.Safezone;
import com.example.Alz.Entities.Demantia;
import com.example.Alz.Entities.Guardian;
import com.example.Alz.Repositories.DemantiaRepository;
import com.example.Alz.Repositories.GuardianRepository;

@RestController
@RequestMapping("/demantia")
public class DemantiaController {

  @Autowired
  private DemantiaRepository demantiaRepository;
  @Autowired
  private GuardianRepository guardianRepository;
@Autowired
private BCryptPasswordEncoder bCryptPasswordEncoder;


@PostMapping("/post-location/{demid}/{latitude}/{longitude}")
    public ResponseEntity postlocation(@PathVariable("demid") String demid,@PathVariable("latitude") BigDecimal latitude,@PathVariable("longitude") BigDecimal longitude){

    Demantia demantia = demantiaRepository.findById(demid).get();
    demantia.setLatitude(latitude);
    demantia.setLongitude(longitude);
    demantiaRepository.save(demantia);
    return new ResponseEntity("Position Updated",HttpStatus.OK);


}

  @PostMapping("/SignUp/{email}")
  public ResponseEntity create(@RequestBody Demantia demantia,@PathVariable("email") String email){

    Guardian guardian= guardianRepository.findByEmail(email);
    if(guardian!=null) {
      if(demantiaRepository.findByEmail(demantia.getEmail())==null){
      demantia.setGuardian(guardian);
      guardian.setDemantia(demantia);
      demantia.setPassword(bCryptPasswordEncoder.encode(demantia.getPassword()));
      demantiaRepository.save(demantia);
      guardianRepository.save(guardian);
      return new ResponseEntity("okah", HttpStatus.OK);}
      else{
        return new ResponseEntity("Email Already used", HttpStatus.OK);}
    }
    else{
      return new ResponseEntity("Guardian Does not exist", HttpStatus.OK);

    }
  }


  @PostMapping("/safezone/{demid}")
  public ResponseEntity safezone(@RequestBody Safezone safezone,@PathVariable("demid") String demid){

  Demantia demantia = demantiaRepository.findById(demid).get();
  demantia.setSafePlaceLatitude(safezone.getLatitude());
  demantia.setSafePlaceLongitude(safezone.getLongitude());
  demantia.setDiameter(safezone.getDiameter());
  demantiaRepository.save(demantia);
  return new ResponseEntity("All good",HttpStatus.OK);
  }

}
