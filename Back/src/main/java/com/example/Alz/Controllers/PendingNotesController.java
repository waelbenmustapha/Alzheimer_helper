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

import com.example.Alz.Entities.Dementia;
import com.example.Alz.Entities.Notes;
import com.example.Alz.Entities.PendingNotes;
import com.example.Alz.Repositories.DementiaRepository;
import com.example.Alz.Repositories.NotesRepository;
import com.example.Alz.Repositories.PendingNotesRepository;



//Pending notes controller add pending change requests so that the guardian can either accept or deny them




@RestController
@RequestMapping("/pending-notes")
public class PendingNotesController {


  @Autowired
  private PendingNotesRepository pendingNotesRepository;
  @Autowired
  private DementiaRepository dementiaRepository;
  @Autowired
  private NotesRepository notesRepository;

  //Add note request

  @PostMapping("/add-note/{dim}")
  public ResponseEntity addPendingNote(@PathVariable("dim") String id, @RequestBody PendingNotes note) {

    Dementia dementia = dementiaRepository.findById(id).get();
    note.setAction("add");
    note.setStatus("pending");
    note.setDementia(dementia);
    pendingNotesRepository.save(note);
    return new ResponseEntity("Saved", HttpStatus.OK);
  }

  //delete note request

  @PostMapping("/delete-note/{noteid}")
  public ResponseEntity deleteNote(@PathVariable("noteid") String noteid) {
    PendingNotes pendingnote = new PendingNotes();
    Notes notedb =notesRepository.findById(noteid).get();
    pendingnote.setNoteToEditId(noteid);
    pendingnote.setAction("delete");
    pendingnote.setDate(notedb.getDate());
    pendingnote.setTitle(notedb.getTitle());
    pendingnote.setDescription(notedb.getDescription());
    pendingnote.setDementia(notedb.getDementia());
    pendingnote.setStatus("pending");
    pendingNotesRepository.save(pendingnote);
    return new ResponseEntity("saved", HttpStatus.OK);

  }

  //Delete Request from list of requests

  @DeleteMapping("/delete-pending-note/{noteid}")
  public ResponseEntity deletenote(@PathVariable("noteid") String noteid) {

    pendingNotesRepository.deleteById(noteid);
    return new ResponseEntity("okah", HttpStatus.OK);

  }

  //Edit note request

  @PutMapping("/edit-note/{noteid}")
  public ResponseEntity editnote(@PathVariable("noteid") String noteid, @RequestBody PendingNotes note) {

    note.setStatus("pending");
    note.setAction("edit");
    note.setDementia(notesRepository.findById(noteid).get().getDementia());
    note.setNoteToEditId(noteid);
    pendingNotesRepository.save(note);
    return new ResponseEntity("okah", HttpStatus.OK);
  }


  //Guardian to accept request

  @PostMapping("/accept/{noteid}")
  public ResponseEntity acceptPendingNote(@PathVariable("noteid") String noteId) {

    PendingNotes pendingnote = pendingNotesRepository.findById(noteId).get();

    //check if the pending note action is add

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

      //check if the pending note action is delete


    } else if (pendingnote.getAction().equals("delete")) {
      notesRepository.deleteById(pendingnote.getNoteToEditId());
      pendingnote.setStatus("accepted");
      pendingNotesRepository.save(pendingnote);
      return new ResponseEntity("ok", HttpStatus.OK);

      //check if the pending note action is edit


    } else if (pendingnote.getAction().equals("edit")) {

      Notes note = notesRepository.findById(pendingnote.getNoteToEditId()).get();

      note.setDate(pendingnote.getDate());
      note.setDescription(pendingnote.getDescription());
      note.setTitle(pendingnote.getTitle());
      pendingnote.setStatus("accepted");
      pendingNotesRepository.save(pendingnote);

      notesRepository.save(note);

      return new ResponseEntity("ok", HttpStatus.OK);

    }

    return new ResponseEntity("ok", HttpStatus.OK);

  }


  //deny request

  @PostMapping("/deny/{noteid}")
  public ResponseEntity denyPendingNote(@PathVariable("noteid") String noteId) {
    PendingNotes pendingnote = pendingNotesRepository.findById(noteId).get();
    pendingnote.setStatus("denied");
      pendingNotesRepository.save(pendingnote);

      return new ResponseEntity("x  ", HttpStatus.OK);
  }

  //get dementia pending notes

  @GetMapping("/get/{dim}")
  public ResponseEntity getPendingNotes(@PathVariable("dim") String id) {

    return new ResponseEntity(dementiaRepository.findById(id).get().getPendingNotes()
        , HttpStatus.OK);

  }
}