Ghost._Routers = Backbone.Router.extend({
    routes: {
    	"!/edit/new":        "open_new_editor",
        "!/edit/:id":        "open_editor",
        "*actions":           "default_route"
    },
    open_new_editor: function() {
		Ghost.Collections.posts.set_active(0);
		if (Ghost.Views.edit) Ghost.Views.edit.undelegateEvents();
		Ghost.Views.edit = new Ghost.Views._New({
			el: '#main'
		}).render();
		if (Ghost.Views.edit_edit) Ghost.Views.edit_edit.undelegateEvents();
		Ghost.Views.edit_edit = new Ghost.Views._New_Edit({
			el: '#posts-edit'
		});
		Ghost.Views.edit_edit.render();
		if (Ghost.Views.edit_view) Ghost.Views.edit_view.undelegateEvents();
		Ghost.Views.edit_view = new Ghost.Views._Edit_View({el: '#posts-view'}).render();
	},
	open_editor: function(id) {
		if(!Ghost.Collections.posts.get(id)) {
			this.default_route();
			return;
		}

		Ghost.Collections.posts.set_active(Ghost.Collections.posts.get_index(id));
		if (Ghost.Views.edit) Ghost.Views.edit.undelegateEvents();
		Ghost.Views.edit = new Ghost.Views._Edit({
			id: id,
			el: '#main'
		}).render();
		if (Ghost.Views.edit_edit) Ghost.Views.edit_edit.undelegateEvents();
		Ghost.Views.edit_edit = new Ghost.Views._Edit_Edit({
			id: id,
			el: '#posts-edit'
		});
		Ghost.Views.edit_edit.render();
		if (Ghost.Views.edit_view) Ghost.Views.edit_view.undelegateEvents();
		Ghost.Views.edit_view = new Ghost.Views._Edit_View({el: '#posts-view'}).render();
	},
	default_route: function() {
		Ghost.routers.navigate("!/", {replace: true});
		Ghost.Utils.set_fullscreen(false);
		if (Ghost.Views.posts) Ghost.Views.posts.undelegateEvents();
		if (Ghost.Views.post_view) Ghost.Views.post_view.undelegateEvents();
		if (Ghost.Views.post_list) Ghost.Views.post_list.undelegateEvents();
		Ghost.Views.posts =     new Ghost.Views._Posts({el: '#main'}).render();
		Ghost.Views.post_list = new Ghost.Views._Posts_List({el: '#posts-list'}).render();
		Ghost.Views.post_view = new Ghost.Views._Posts_View({el: '#posts-view'}).render();
	}
});