package com.easyacademics.learningtool.dto;


import lombok.Data;

import java.util.List;

@Data
public class GroupDto {
    private String name;
    private List<String> members;
}
