package com.example.Alz.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Alz.Entities.Notes;
import com.example.Alz.Repositories.DementiaRepository;
import com.example.Alz.Repositories.NotesRepository;

@RestController
@RequestMapping("/notes")
public class NotesController {

  @Autowired
  private NotesRepository notesRepository;
  @Autowired
  private DementiaRepository dementiaRepository;

  @PostMapping("/add-note/{demantiaId}")
  public ResponseEntity addNote(@RequestBody Notes notes, @PathVariable("demantiaId") String id) {

    notes.setDementia(dementiaRepository.findById(id).get());
    notesRepository.save(notes);
    return new ResponseEntity("Saved", HttpStatus.OK);
  }

  @GetMapping("/get-notes-by-dementia-id/{demid}")
  public ResponseEntity getnotesbydementiaid(@PathVariable("demid") String demid) {

    return new ResponseEntity(notesRepository.findByDementiaId(demid), HttpStatus.OK);

  }


  @PutMapping("/edit-note/{id}")
  public ResponseEntity editnote(@PathVariable("id") String id, @RequestBody Notes note) {

    Notes noteToEdit = notesRepository.findById(id).get();
    noteToEdit.setDescription(note.getDescription());
    noteToEdit.setDate(note.getDate());
    noteToEdit.setTitle(note.getTitle());
    notesRepository.save(noteToEdit);
    return new ResponseEntity("Edited", HttpStatus.OK);

  }

  @DeleteMapping("/delete-note/{id}")
  public ResponseEntity deleteNote(@PathVariable("id") String id) {

    notesRepository.deleteById(id);
    return new ResponseEntity("Deleted", HttpStatus.OK);

  }

  @GetMapping("/get-note/{id}")
  public ResponseEntity getNote(@PathVariable("id") String id) {

    return new ResponseEntity(notesRepository.findById(id).get(), HttpStatus.OK);

  }
  }
