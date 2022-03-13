package com.example.Alz.Entities;

import java.math.BigDecimal;
import java.util.Date;
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
public class Dementia {

  @GeneratedValue(generator = "uuid")
  @GenericGenerator(name = "uuid", strategy = "uuid")
  @Column(columnDefinition = "CHAR(32)")
  @Id
  private String id;


  @Digits(integer=3, fraction=7)
  private BigDecimal safePlaceLatitude;
  @Digits(integer=3, fraction=7)
  private BigDecimal safePlaceLongitude;

  private int diameter;
  private String name;
  private Date birthdate;
  private String email;
  private String password;
private String type = "dementia";
  private String PushToken;

  @OneToMany(mappedBy="dementia")
  private List<Notes> notes;

  @Digits(integer=3, fraction=7)
  private BigDecimal latitude;
  @Digits(integer=3, fraction=7)
  private BigDecimal longitude;
  @Column(name="story", columnDefinition="LONGTEXT")
  private String story;
  @OneToOne(mappedBy = "dementia")
  @JsonIgnore
  private Guardian guardian;
}
