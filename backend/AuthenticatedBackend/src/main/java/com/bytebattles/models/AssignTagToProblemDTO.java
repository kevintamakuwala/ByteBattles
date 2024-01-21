package com.bytebattles.models;

import java.util.Set;

public class AssignTagToProblemDTO {
    Set<Tag> tags;

    public AssignTagToProblemDTO() {
        super();
    }

    public AssignTagToProblemDTO(Set<Tag> tags) {
        this.tags = tags;
    }

    public Set<Tag> getTags() {
        return tags;
    }

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
    }

    @Override
    public String toString() {
        return "AssignTagToProblemDTO{" +
                "tags=" + tags +
                '}';
    }
}
