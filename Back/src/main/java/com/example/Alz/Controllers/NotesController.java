package com.example.Alz.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Alz.Entities.Notes;
import com.example.Alz.Repositories.DemantiaRepository;
import com.example.Alz.Repositories.NotesRepository;

@RestController
@RequestMapping("/notes")
public class NotesController {

  @Autowired
  private NotesRepository notesRepository;
  @Autowired
  private DemantiaRepository demantiaRepository;

@PostMapping("/add-note/{demantiaId}")
  public ResponseEntity addNote(@RequestBody Notes notes,@PathVariable("demantiaId") String id){

  notes.setDemantia(demantiaRepository.findById(id).get());
  notesRepository.save(notes);
  return new ResponseEntity("Saved", HttpStatus.OK);
}


}
