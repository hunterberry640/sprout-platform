package net.savantly.sprout.module.content.model.webPageContent;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import net.savantly.sprout.core.domain.PersistedDomainObjectRepository;

@RepositoryRestResource(path="webPageContents", collectionResourceRel = "webPageContents", itemResourceRel = "webPageContent")
public interface WebPageContentRepository extends PersistedDomainObjectRepository<WebPageContent> {

}
