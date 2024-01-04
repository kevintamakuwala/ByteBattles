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
    @JsonProperty("tagID")
    private Long tagID;

    @Column(name = "tag_name")
    @JsonProperty("tagName")
    private String name;

    public Long getTagID() {
        return tagID;
    }

    public void setTagID(Long tagID) {
        this.tagID = tagID;
    }

    public String getName() {
        return name;
    }



    public void setName(String name) {
        this.name = name;
    }

    public Tag() {
    }

    public Tag(Long tagID, String name) {
        this.tagID= tagID;
        this.name = name;
    }

    @Override
    public String toString() {
        return "Tag{" +
                "tagID=" + tagID +
                ", name='" + name + '\'' +
                '}';
    }

}
