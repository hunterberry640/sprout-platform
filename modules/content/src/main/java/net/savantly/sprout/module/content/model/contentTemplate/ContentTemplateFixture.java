package net.savantly.sprout.module.content.model.contentTemplate;

import java.util.List;

import net.savantly.spring.fixture.AbstractBaseFixture;
import net.savantly.spring.fixture.Fixture;

public class ContentTemplateFixture extends AbstractBaseFixture<ContentTemplateImpl, ContentTemplateRepository> {

	public static final String defaultContentTemplateName = "Default Content Template";

	private ContentTemplateRepository repository;

	public ContentTemplateFixture(ContentTemplateRepository repository) {
		super(repository);
		this.repository = repository;
	}

	@Override
	public void addDependencies(List<Fixture<?>> arg0) {

	}

	@Override
	public void addEntities(List<ContentTemplateImpl> entities) {
		ContentTemplateImpl defaultContentTemplate = repository.findByName(defaultContentTemplateName);
		if (null == defaultContentTemplate) {
			defaultContentTemplate = new ContentTemplateImpl();
			defaultContentTemplate.setName(defaultContentTemplateName);
			defaultContentTemplate.setDescription(defaultContentTemplateName);
			defaultContentTemplate.setContent("${body}");
			entities.add(defaultContentTemplate);
		}
	}

}
