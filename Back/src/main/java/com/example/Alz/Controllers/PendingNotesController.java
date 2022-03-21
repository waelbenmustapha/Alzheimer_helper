package com.example.Alz.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Alz.Entities.Dementia;
import com.example.Alz.Entities.Notes;
import com.example.Alz.Entities.PendingNotes;
import com.example.Alz.Repositories.DementiaRepository;
import com.example.Alz.Repositories.NotesRepository;
import com.example.Alz.Repositories.PendingNotesRepository;

@RestController
@RequestMapping("/pending-notes")
public class PendingNotesController {


  @Autowired
  private PendingNotesRepository pendingNotesRepository;
  @Autowired
  private DementiaRepository dementiaRepository;
  @Autowired
  private NotesRepository notesRepository;

  @PostMapping("/add-note/{dim}")
  public ResponseEntity addPendingNote(@PathVariable("dim") String id, @RequestBody PendingNotes note) {

    Dementia dementia = dementiaRepository.findById(id).get();
    note.setAction("add");
    note.setStatus("pending");
    note.setDementia(dementia);
    pendingNotesRepository.save(note);
    return new ResponseEntity("Saved", HttpStatus.OK);
  }

  @PostMapping("/delete-note/{noteid}")
  public ResponseEntity deleteNote(@PathVariable("noteid") String noteid) {
    PendingNotes pendingnote = new PendingNotes();
    pendingnote.setNoteToEditId(noteid);
    pendingnote.setAction("delete");
    pendingnote.setStatus("pending");
    pendingNotesRepository.save(pendingnote);
    return new ResponseEntity("saved", HttpStatus.OK);

  }

  @PutMapping("/edit-note/{noteid}")
  public ResponseEntity editnote(@PathVariable("noteid") String noteid, @RequestBody PendingNotes note) {

    note.setStatus("pending");
    note.setAction("edit");
    note.setNoteToEditId(noteid);
    pendingNotesRepository.save(note);
    return new ResponseEntity("okah", HttpStatus.OK);
  }


  @PostMapping("/accept/{noteid}")
  public ResponseEntity acceptPendingNote(@PathVariable("noteid") String noteId) {

    PendingNotes pendingnote = pendingNotesRepository.findById(noteId).get();
    if (pendingnote.getAction().equals("add")) {
      Notes note = new Notes();
      note.setTitle(pendingnote.getTitle());
      note.setDate(pendingnote.getDate());
      note.setDescription(pendingnote.getDescription());
      note.setDementia(pendingnote.getDementia());

      notesRepository.save(note);

      pendingnote.setStatus("accepted");
      pendingNotesRepository.save(pendingnote);
      return new ResponseEntity("ok", HttpStatus.OK);

    } else if (pendingnote.getAction().equals("delete")) {
      notesRepository.deleteById(pendingnote.getNoteToEditId());
      pendingnote.setStatus("accepted");
      pendingNotesRepository.save(pendingnote);
      return new ResponseEntity("ok", HttpStatus.OK);

    }else if (pendingnote.getAction().equals("edit")) {

     Notes note = notesRepository.findById(pendingnote.getNoteToEditId()).get();

     note.setDate(pendingnote.getDate());
     note.setDescription(pendingnote.getDescription());
     note.setTitle(pendingnote.getTitle());
     notesRepository.save(note);

      return new ResponseEntity("ok", HttpStatus.OK);

    }


    return new ResponseEntity("ok", HttpStatus.OK);

  }


  @PostMapping("/deny/{noteid}")
  public ResponseEntity denyPendingNote(@PathVariable("noteid") String noteId) {
    PendingNotes pendingnote = pendingNotesRepository.findById(noteId).get();
    pendingnote.setStatus("denied");
    return new ResponseEntity("ok", HttpStatus.OK);
  }
}
