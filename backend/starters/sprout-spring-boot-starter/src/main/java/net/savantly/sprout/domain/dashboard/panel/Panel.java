package net.savantly.sprout.domain.dashboard.panel;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Embedded;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import net.savantly.sprout.domain.dashboard.grid.GridPosition;

@Embeddable
@Accessors(chain = true)
@Getter @Setter
public class Panel {
	
	private int id;
	
	@Column(name = "panel_type")
	private String type;
	
	private String title;
	private boolean transparent;
	
	@Embedded
	private GridPosition gridPos;
	
	@Size(max = 64000)
	private String options;
	private String pluginVersion;
	
}
