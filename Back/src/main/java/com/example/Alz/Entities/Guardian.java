package com.example.Alz.Entities;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import org.hibernate.annotations.GenericGenerator;

import lombok.Data;

@Entity
@Data
public class Guardian {

  @GeneratedValue(generator = "uuid")
  @GenericGenerator(name = "uuid", strategy = "uuid")
  @Column(columnDefinition = "CHAR(32)")
  @Id
  private String id;
private Double phoneNumber;
  private String PushToken;
private String pinCode;

  private String name;
  private Boolean verified = false;
private String verificationCode;
  @OneToOne
  private Dementia dementia;

  private String email;
  private String type = "guardian";

private String password;



}
