package net.savantly.sprout.module.content.model.contentTemplate;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import net.savantly.sprout.core.domain.PersistedDomainObject;
import net.savantly.sprout.module.content.model.contentItem.ContentItem;

@Entity
@Table(name="CONTENT_TEMPLATE")
public class ContentTemplate extends PersistedDomainObject{

	@Column(unique=true)
	private String name;
	private String description;
	@Lob
	private String content;
	@OneToMany
	private Set<ContentItem> contentItems = new HashSet<ContentItem>();
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Set<ContentItem> getContentItems() {
		return contentItems;
	}

	public void setContentItems(Set<ContentItem> contentItems) {
		this.contentItems = contentItems;
	}

}
