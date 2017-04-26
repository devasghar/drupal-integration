define(function(require, exports, module) {

    var CommandManager = brackets.getModule("command/CommandManager"),
        Menus = brackets.getModule("command/Menus"),
        Dialogs = brackets.getModule("widgets/Dialogs"),
        DefaultDialogs = brackets.getModule("widgets/DefaultDialogs"),
        PanelManager = brackets.getModule("view/PanelManager"),
        ExtensionUtils = brackets.getModule("utils/ExtensionUtils"),
        AppInit = brackets.getModule("utils/AppInit");
    
    var PANEL_BOTTOM_TOGGLE_EXEC = "panelBottomToggle.execute";
    var panel;
    var panelHtml = require("text!markup/drupal-integration-panel.html");

    /*
    * @param body
    *   Message body
    */
    function bracket_set_message(body) {
        Dialogs.showModalDialog(DefaultDialogs.DIALOG_ID_INFO, "Drupal Integration !", body);
    }


    function panelBottomToggle() {
        if(panel.isVisible()) {
            panel.hide();
            CommandManager.get(PANEL_BOTTOM_TOGGLE_EXEC).setChecked(false);
        } else {
            panel.show();
            CommandManager.get(PANEL_BOTTOM_TOGGLE_EXEC).setChecked(true);
        }
    }


    AppInit.appReady(function () {
        ExtensionUtils.loadStyleSheet(module, "css/drupal-integration-styles.css");
        
        CommandManager.register("Drupal Integration", PANEL_BOTTOM_TOGGLE_EXEC, panelBottomToggle);

        var menu = Menus.getMenu(Menus.AppMenuBar.VIEW_MENU);
        menu.addMenuItem(PANEL_BOTTOM_TOGGLE_EXEC);
        
        panel = PanelManager.createBottomPanel(PANEL_BOTTOM_TOGGLE_EXEC, $(panelHtml));
        

    });

});