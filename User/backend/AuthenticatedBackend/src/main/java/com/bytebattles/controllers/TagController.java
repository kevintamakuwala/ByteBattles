package com.bytebattles.controllers;

import com.bytebattles.models.Tag;
import com.bytebattles.services.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tags")
public class TagController {
    @Autowired
    private TagService tagService;

    @GetMapping({"/", ""})
    public ResponseEntity<List<Tag>> getTags() {
        List<Tag> tags = tagService.getTags();
        return new ResponseEntity<>(tags, HttpStatus.OK);
    }

    @GetMapping({"/{tagId}/", "/{tagId}"})
    public ResponseEntity<Tag> getTagById(@PathVariable String tagId) {
        Tag tag = tagService.getTagById(tagId);
        if (tag != null) {
            return new ResponseEntity<>(tag, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping({"/", ""})
    public ResponseEntity<Tag> addTag(@RequestBody Tag tag) {
        Tag addedTag = tagService.addTag(tag);
        return new ResponseEntity<>(addedTag, HttpStatus.CREATED);
    }

    @PutMapping({"/{tagId}/", "/{tagId}"})
    public ResponseEntity<Tag> updateTag(@PathVariable String tagId, @RequestBody Tag updatedTag) {
        updatedTag.setTagId(Long.parseLong(tagId));
        Tag updated = tagService.updateTag(updatedTag);

        if (updated != null) {
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping({"/{tagId}/", "/{tagId}"})
    public ResponseEntity<Void> deleteTag(@PathVariable String tagId) {
        boolean deleted = tagService.deleteTag(tagId);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
