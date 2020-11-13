package net.savantly.sprout.domain.dashboard;

import java.io.IOException;
import java.util.Objects;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/dashboards")
@RestController
public class DashboardsApi {
	
	private DashboardService service;
    private ServletContext servletContext;


	public DashboardsApi(
			ServletContext servletContext,
			DashboardService service) {
		this.servletContext = servletContext;
		this.service = service;
	}

	@GetMapping("/home")
	public ResponseEntity<DashboardDtoWrapper> getHome() throws IOException{
	    return ResponseEntity.ok()
	            .contentType(MediaType.APPLICATION_JSON)
	            .body(service.getHomeDashboard());
	}
	
	@PostMapping("/db")
	public DashboardSaveResponse saveDashboard(@RequestBody DashboardSaveRequest dto, HttpServletRequest request) {
		DashboardDtoWrapper saved = this.service.saveDashboard(dto);
		return toSaveResponse(saved);
	}
	

	@GetMapping({"/uid/{uid}"})
	public DashboardDtoWrapper getDashboard(@PathVariable("uid") String uid) {
		DashboardDtoWrapper saved = this.service.getByUid(uid);
		setMetaDashboardUrl(saved);
		return saved;
	}
	
	private void setMetaDashboardUrl(DashboardDtoWrapper dto) {

		dto.getMeta().setUrl(servletContext.getContextPath() + "/api/dashboards/uid/" + dto.getDashboard().getUid());
	}
	

	private DashboardSaveResponse toSaveResponse(DashboardDtoWrapper saved) {
		String slug = createSlug(saved);
		return new DashboardSaveResponse()
			.setId(saved.getDashboard().getId())
			.setSlug(slug)
			.setStatus("success")
			.setUid(saved.getDashboard().getUid())
			.setUrl(servletContext.getContextPath() + "/d/" + saved.getDashboard().getUid() + "/" + slug)
			.setVersion(saved.getDashboard().getVersion());
	}

	private String createSlug(DashboardDtoWrapper dto) {
		String title = dto.getDashboard().getTitle();
		if (Objects.nonNull(title) && !title.isEmpty()) {
			return title.replace(" ", "-").toLowerCase();
		} else {
			return "untitled";
		}
	}
}
