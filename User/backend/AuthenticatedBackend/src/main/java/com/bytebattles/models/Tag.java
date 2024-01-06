package com.bytebattles.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "tags")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tag_id")
    @JsonProperty("tagId")
    private Long tagId;

    @Column(name = "tag_name")
    @JsonProperty("tagName")
    private String name;

    public Long getTagId() {
        return tagId;
    }

    public void setTagId(Long tagID) {
        this.tagId = tagID;
    }

    public String getName() {
        return name;
    }



    public void setName(String name) {
        this.name = name;
    }

    public Tag() {
    }

    public Tag(Long tagId, String name) {
        this.tagId= tagId;
        this.name = name;
    }

    @Override
    public String toString() {
        return "Tag{" +
                "tagID=" + tagId +
                ", name='" + name + '\'' +
                '}';
    }

}
