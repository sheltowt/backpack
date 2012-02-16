(function() {
  var Backpack, root,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  Backpack = {
    VERSION: '0.0.1',
    Helpers: {
      slug: function(string) {
        if (string == null) string = "";
        return string.toLowerCase().replace(/\ +/g, "-").replace(/[^a-z0-9-]/g, "");
      }
    }
  };

  root.Backpack = Backpack;

  Backpack.Menu = (function(_super) {

    __extends(Menu, _super);

    function Menu() {
      this.add = __bind(this.add, this);
      this.slug = __bind(this.slug, this);
      this.addClass = __bind(this.addClass, this);
      this.setParent = __bind(this.setParent, this);
      this.render = __bind(this.render, this);
      Menu.__super__.constructor.apply(this, arguments);
    }

    Menu.prototype.tagName = 'ul';

    Menu.prototype.className = 'backpack-menu';

    Menu.prototype.initialize = function(parent, name) {
      if (parent == null) parent = 'body';
      if (name == null) name = '';
      this.setParent(parent);
      this.addClass(name);
      return this;
    };

    Menu.prototype.render = function() {
      this.$el.appendTo(this.parent);
      return this;
    };

    Menu.prototype.setParent = function(parent) {
      this.parent = $(parent);
      return this;
    };

    Menu.prototype.addClass = function(name) {
      if (name == null) name = '';
      this.$el.addClass(this.slug(name));
      return this;
    };

    Menu.prototype.slug = function(string) {
      if (string == null) string = '';
      return Backpack.Helpers.slug(string);
    };

    Menu.prototype.add = function(content, events, name) {
      var menuItem;
      if (content == null) content = '';
      if (events == null) events = {};
      if (content.el != null) {
        menuItem = content;
      } else {
        menuItem = new Backpack.MenuItem(content, events, name);
      }
      this.$el.append(menuItem.render().el);
      return this;
    };

    return Menu;

  })(Backbone.View);

  Backpack.MenuItem = (function(_super) {

    __extends(MenuItem, _super);

    function MenuItem() {
      this.setContent = __bind(this.setContent, this);
      this.slug = __bind(this.slug, this);
      this.addClass = __bind(this.addClass, this);
      this.render = __bind(this.render, this);
      MenuItem.__super__.constructor.apply(this, arguments);
    }

    MenuItem.prototype.tagName = 'li';

    MenuItem.prototype.className = 'backpack-menu-item';

    MenuItem.prototype.template = _.template("<a href='<%= href %>'><%= content %></a>");

    MenuItem.prototype.events = {};

    MenuItem.prototype.initialize = function(content, events, name) {
      if (content == null) content = '';
      if (events == null) events = {};
      if (name == null) name = '';
      this.setContent(content, events);
      this.delegateEvents(this.events);
      this.addClass(name);
      return this;
    };

    MenuItem.prototype.render = function() {
      this.$el.html(this.content);
      return this;
    };

    MenuItem.prototype.addClass = function(name) {
      if (name == null) name = '';
      this.$el.addClass(this.slug(name));
      return this;
    };

    MenuItem.prototype.slug = function(string) {
      if (string == null) string = '';
      return Backpack.Helpers.slug(string);
    };

    MenuItem.prototype.setContent = function(content, events) {
      if (content == null) content = '';
      if (events == null) events = {};
      if (content.el != null) {
        this.content = content.el;
        return this;
      }
      if (_.isString(events)) {
        this.content = this.template({
          href: events,
          content: content
        });
        return this;
      }
      if (_.isFunction(events)) {
        this.events = {
          'click': events
        };
        this.content = this.template({
          href: 'javascript:void(0);',
          content: content
        });
        return this;
      }
      this.events = events;
      this.content = this.template({
        href: 'javascript:void(0);',
        content: content
      });
      return this;
    };

    return MenuItem;

  })(Backbone.View);

  Backpack.Dialog = (function(_super) {

    __extends(Dialog, _super);

    function Dialog() {
      this.slug = __bind(this.slug, this);
      this.addClass = __bind(this.addClass, this);
      this.show = __bind(this.show, this);
      this.hide = __bind(this.hide, this);
      this.setParent = __bind(this.setParent, this);
      this.setContent = __bind(this.setContent, this);
      this.render = __bind(this.render, this);
      Dialog.__super__.constructor.apply(this, arguments);
    }

    Dialog.prototype.tagName = 'div';

    Dialog.prototype.className = 'backpack-dialog';

    Dialog.prototype.options = {
      name: '',
      parent: 'body',
      content: ''
    };

    Dialog.prototype.events = {
      'click': 'hide'
    };

    Dialog.prototype.initialize = function() {
      var content, name, parent, _ref;
      _ref = this.options, name = _ref.name, parent = _ref.parent, content = _ref.content;
      this.setContent(content);
      this.setParent(parent);
      this.addClass(name);
      return this;
    };

    Dialog.prototype.render = function() {
      this.$el.appendTo(this.parent);
      return this;
    };

    Dialog.prototype.setContent = function(content) {
      if (content.el != null) {
        this.content = content;
      } else {
        this.content = content;
      }
      this.$el.html(this.content);
      return this;
    };

    Dialog.prototype.setParent = function(parent) {
      this.parent = parent;
      return this;
    };

    Dialog.prototype.hide = function() {
      this.$el.addClass('hide');
      this.undelegateEvents();
      return this;
    };

    Dialog.prototype.show = function() {
      this.delegateEvents(this.events);
      this.$el.removeClass('hide');
      return this;
    };

    Dialog.prototype.addClass = function(name) {
      this.$el.addClass(this.slug(name));
      return this;
    };

    Dialog.prototype.slug = function(name) {
      if (name == null) name = '';
      return Backpack.Helpers.slug(name);
    };

    return Dialog;

  })(Backbone.View);

  Backpack.Overlay = (function(_super) {
    var instance;

    __extends(Overlay, _super);

    function Overlay() {
      this.setOptions = __bind(this.setOptions, this);
      this.setParent = __bind(this.setParent, this);
      this.setColor = __bind(this.setColor, this);
      this.setLock = __bind(this.setLock, this);
      this.unlock = __bind(this.unlock, this);
      this.show = __bind(this.show, this);
      this.hide = __bind(this.hide, this);
      this.render = __bind(this.render, this);
      Overlay.__super__.constructor.apply(this, arguments);
    }

    Overlay.prototype.id = 'backpack-overlay';

    Overlay.prototype.tagName = 'div';

    Overlay.prototype.className = 'hide';

    Overlay.prototype.options = {
      lock: false,
      parent: 'body',
      color: 'rgba(0,0,0,0.7)'
    };

    Overlay.prototype.events = {
      'click': 'unlock'
    };

    instance = false;

    Overlay.getInstance = function(options) {
      var color, lock, parent, _ref;
      _ref = options != null, lock = _ref.lock, parent = _ref.parent, color = _ref.color;
      if (instance) {
        return instance.setLock({
          lock: lock,
          parent: parent,
          color: color
        });
      }
      return instance = new Backpack.Overlay();
    };

    Overlay.prototype.initialize = function() {
      var color, lock, parent, _ref;
      if (instance) return instance;
      _ref = this.options, lock = _ref.lock, parent = _ref.parent, color = _ref.color;
      this.setLock(lock);
      this.setParent(parent);
      this.setColor(color);
      return this;
    };

    Overlay.prototype.render = function() {
      this.$el.prependTo(this.parent);
      return this;
    };

    Overlay.prototype.hide = function() {
      this.$el.addClass('hide');
      this.undelegateEvents();
      return this;
    };

    Overlay.prototype.show = function() {
      this.delegateEvents(this.events);
      this.$el.removeClass('hide');
      return this;
    };

    Overlay.prototype.unlock = function() {
      if (!this.lock) this.hide();
      return this;
    };

    Overlay.prototype.setLock = function(lock) {
      this.lock = lock;
      return this;
    };

    Overlay.prototype.setColor = function(color) {
      this.el.style.backgroundColor = color;
      return this;
    };

    Overlay.prototype.setParent = function(parent) {
      this.parent = parent;
      return this;
    };

    Overlay.prototype.setOptions = function(options) {
      return this.setLock(lock);
    };

    return Overlay;

  })(Backbone.View);

  Backpack.Modal = (function(_super) {
    var overlay;

    __extends(Modal, _super);

    function Modal() {
      this.hide = __bind(this.hide, this);
      this.show = __bind(this.show, this);
      this.render = __bind(this.render, this);
      Modal.__super__.constructor.apply(this, arguments);
    }

    Modal.prototype.tagName = 'div';

    Modal.prototype.className = 'backpack-modal';

    Modal.prototype.events = {
      'click': 'hide'
    };

    overlay = Backpack.Overlay.getInstance();

    Modal.prototype.initialize = function() {
      Modal.__super__.initialize.call(this);
      return this;
    };

    Modal.prototype.render = function() {
      this.$el.appendTo(this.parent);
      return this;
    };

    Modal.prototype.show = function() {
      Modal.__super__.show.call(this);
      overlay.setLock(true).render().show();
      return this;
    };

    Modal.prototype.hide = function() {
      Modal.__super__.hide.call(this);
      overlay.render().hide();
      return this;
    };

    return Modal;

  })(Backpack.Dialog);

}).call(this);