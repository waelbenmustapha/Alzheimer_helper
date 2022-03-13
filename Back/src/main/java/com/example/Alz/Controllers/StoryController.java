package com.example.Alz.Controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Alz.Entities.Dementia;
import com.example.Alz.Repositories.DementiaRepository;

@RestController
@RequestMapping("/story")
public class StoryController {


  private DementiaRepository dementiaRepository;

  public StoryController(DementiaRepository dementiaRepository) {
    this.dementiaRepository = dementiaRepository;
  }


  @PostMapping("/add/{demid}")
  public ResponseEntity addStory(@PathVariable("demid") String id,@RequestBody String story){
   Dementia dementia= dementiaRepository.findById(id).get();
   dementia.setStory(story);
   dementiaRepository.save(dementia);
   return new ResponseEntity("saved", HttpStatus.OK);

  }

}
