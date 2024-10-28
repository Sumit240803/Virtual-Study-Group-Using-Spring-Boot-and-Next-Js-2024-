package com.easyacademics.learningtool.dto;

import lombok.Data;

@Data
public class RegisterDto {
    private String name;
    private String username;
    private String password;
    private String email;
}
