package com.example.Alz.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Alz.Entities.Guardian;
import com.example.Alz.Repositories.DemantiaRepository;
import com.example.Alz.Repositories.GuardianRepository;

@RestController
@RequestMapping("/guardian")
public class GuardianController {

  @Autowired
  private DemantiaRepository demantiaRepository;

  @Autowired
  private GuardianRepository guardianRepository;

  @PostMapping("/create")
  public ResponseEntity CreateGuardian(@RequestBody Guardian guardian){
guardianRepository.save(guardian);
return new ResponseEntity("Saved", HttpStatus.OK);
  }

  @GetMapping("/get")
  public ResponseEntity findguardians(){
    return new ResponseEntity(    guardianRepository.findAll(), HttpStatus.OK);
  }

  @GetMapping("/get/{Gid}")
  public ResponseEntity getGuardianbyid(@PathVariable("Gid") String gid){
    return new ResponseEntity(    guardianRepository.findById(gid), HttpStatus.OK);
  }



  @PostMapping("/adddem/{gid}/{did}")
  public ResponseEntity adddem(@PathVariable("gid") String gid,@PathVariable("did") String did){
   Guardian guardiantochange = guardianRepository.findById(gid).get();
   guardiantochange.setDemantia(demantiaRepository.findById(did).get());
   guardianRepository.save(guardiantochange);
   return new ResponseEntity("good",HttpStatus.OK);
  }
}
