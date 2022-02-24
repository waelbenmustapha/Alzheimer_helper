package com.example.Alz.Entities;

import java.util.Random;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import lombok.Data;

@Entity
@Data
public class Guardian {

  @GeneratedValue(generator = "uuid")
  @GenericGenerator(name = "uuid", strategy = "uuid")
  @Column(columnDefinition = "CHAR(32)")
  @Id
  private String id;


  private String name;

  @OneToOne
  private Demantia demantia;

  private String email;
  private String type = "guardian";

private String password;



}
