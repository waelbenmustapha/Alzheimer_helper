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

import com.example.Alz.Entities.Contacts;
import com.example.Alz.Entities.Dementia;
import com.example.Alz.Repositories.ContactsRepository;
import com.example.Alz.Repositories.DementiaRepository;

@RestController
@RequestMapping("/contacts")
public class ContactsController {

  @Autowired
  ContactsRepository contactsRepository;
  @Autowired
  DementiaRepository dementiaRepository;

  @PostMapping("/add/{dim}")
  public ResponseEntity add(@PathVariable("dim") String id, @RequestBody Contacts contacts) {

    Dementia dementia = dementiaRepository.findById(id).get();
    contacts.setDementia(dementia);
    contactsRepository.save(contacts);

    return new ResponseEntity("added", HttpStatus.OK);
  }

  @DeleteMapping("/delete/{contactid}")
  public ResponseEntity delete(@PathVariable("contactid") String id) {

    contactsRepository.deleteById(id);

    return new ResponseEntity("deleted", HttpStatus.OK);
  }

  @PutMapping("/edit/{contactid}")
  public ResponseEntity edit(@PathVariable("contactid") String id, @RequestBody Contacts contacts) {


    Contacts contactondb = contactsRepository.findById(id).get();
    contactondb.setImage(contacts.getImage());
    contactondb.setName(contacts.getName());
    contactondb.setNumber(contacts.getNumber());
    contactsRepository.save(contactondb);

    return new ResponseEntity("edited", HttpStatus.OK);
  }

  @GetMapping("/get-contacts/{dim}")
  public ResponseEntity get(@PathVariable("dim") String id) {

    Dementia dementia = dementiaRepository.findById(id).get();

    return new ResponseEntity(dementiaRepository.findById(id).get().getContacts(), HttpStatus.OK);
  }

}
