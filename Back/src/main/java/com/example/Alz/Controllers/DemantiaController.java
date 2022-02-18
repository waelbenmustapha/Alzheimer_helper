package com.example.Alz.Controllers;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

  @PostMapping("/create/{relationKey}")
  public ResponseEntity create(@RequestBody Demantia demantia,@PathVariable("relationKey") String key){

 Guardian guardian= guardianRepository.findByRelationKey(key);
 demantia.setGuardian(guardian);
 guardian.setDemantia(demantia);
 demantiaRepository.save(demantia);
guardianRepository.save(guardian);
  return new ResponseEntity("okah", HttpStatus.OK);
}


@PostMapping("/post-location/{demid}/{latitude}/{longitude}")
    public ResponseEntity postlocation(@PathVariable("demid") String demid,@PathVariable("latitude") BigDecimal latitude,@PathVariable("longitude") BigDecimal longitude){

    Demantia demantia = demantiaRepository.findById(demid).get();
    demantia.setLatitude(latitude);
    demantia.setLongitude(longitude);
    demantiaRepository.save(demantia);
    return new ResponseEntity("Position Updated",HttpStatus.OK);


}

}
