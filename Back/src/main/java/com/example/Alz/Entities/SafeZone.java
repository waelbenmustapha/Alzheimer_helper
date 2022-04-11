package com.example.Alz.Entities;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Digits;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Entity
@Data
public class SafeZone {
  @GeneratedValue(generator = "uuid")
  @GenericGenerator(name = "uuid", strategy = "uuid")
  @Column(columnDefinition = "CHAR(32)")
  @Id
  private String id;
  @Digits(integer=3, fraction=7)
  private BigDecimal latitude;
  @Digits(integer=3, fraction=7)
  private BigDecimal longitude;
  private int diameter;
  private String Title;
  @ManyToOne
  @JsonIgnore
  private Dementia dementia;
  private Boolean active=false;
}
