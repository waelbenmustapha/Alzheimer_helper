package com.example.Alz.Dto;

import java.math.BigDecimal;

import javax.validation.constraints.Digits;

import lombok.Data;

@Data
public class Safezone {

  @Digits(integer=3, fraction=7)
  private BigDecimal latitude;
  @Digits(integer=3, fraction=7)
  private BigDecimal longitude;
  private int diameter;

}
