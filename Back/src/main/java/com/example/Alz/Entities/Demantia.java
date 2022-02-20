package com.example.Alz.Entities;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.Digits;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Entity
@Data
public class Demantia {

  @GeneratedValue(generator = "uuid")
  @GenericGenerator(name = "uuid", strategy = "uuid")
  @Column(columnDefinition = "CHAR(32)")
  @Id
  private String id;


  private String name;

  @OneToMany(mappedBy="demantia")
  private List<Notes> notes;

  @Digits(integer=2, fraction=7)
  private BigDecimal latitude;
  @Digits(integer=2, fraction=7)
  private BigDecimal longitude;

  @OneToOne(mappedBy = "demantia")
  @JsonIgnore
  private Guardian guardian;
}
