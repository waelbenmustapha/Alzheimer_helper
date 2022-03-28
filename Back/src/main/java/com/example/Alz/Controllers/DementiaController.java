package com.example.Alz.Controllers;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Alz.Dto.Safezone;
import com.example.Alz.Entities.Dementia;
import com.example.Alz.Entities.Guardian;
import com.example.Alz.Repositories.DementiaRepository;
import com.example.Alz.Repositories.GuardianRepository;

@RestController
@RequestMapping("/dementia")
public class DementiaController {

  @Autowired
  private DementiaRepository dementiaRepository;
  @Autowired
  private GuardianRepository guardianRepository;
@Autowired
private BCryptPasswordEncoder bCryptPasswordEncoder;


@PostMapping("/post-location/{demid}/{latitude}/{longitude}")
    public ResponseEntity postlocation(@PathVariable("demid") String demid,@PathVariable("latitude") BigDecimal latitude,@PathVariable("longitude") BigDecimal longitude){

    Dementia dementia = dementiaRepository.findById(demid).get();
    dementia.setLatitude(latitude);
    dementia.setLongitude(longitude);
    dementiaRepository.save(dementia);
    return new ResponseEntity("Position Updated",HttpStatus.OK);


}

  @PostMapping("/SignUp/{email}")
  public ResponseEntity create(@RequestBody Dementia dementia,@PathVariable("email") String email){

    Guardian guardian= guardianRepository.findByEmail(email);
    if(guardian!=null) {
      if(dementiaRepository.findByEmail(dementia.getEmail())==null){
      dementia.setGuardian(guardian);
      guardian.setDementia(dementia);
      dementia.setPassword(bCryptPasswordEncoder.encode(dementia.getPassword()));
      dementiaRepository.save(dementia);
      guardianRepository.save(guardian);
      return new ResponseEntity("Signup successful", HttpStatus.OK);}
      else{
        return new ResponseEntity("Email Already exist", HttpStatus.IM_USED);}
    }
    else{
      return new ResponseEntity("Guardian Does not exist", HttpStatus.NOT_FOUND);

    }
  }


  @PostMapping("/safezone/{demid}")
  public ResponseEntity safezone(@RequestBody Safezone safezone,@PathVariable("demid") String demid){

  Dementia dementia = dementiaRepository.findById(demid).get();
  dementia.setSafePlaceLatitude(safezone.getLatitude());
  dementia.setSafePlaceLongitude(safezone.getLongitude());
  dementia.setDiameter(safezone.getDiameter());
  dementiaRepository.save(dementia);
  return new ResponseEntity("All good",HttpStatus.OK);
  }

}
