// Variables
const mainMenu = document.querySelector("#espritmenu");
let siteRtl = document.querySelector('body').getAttribute("dir");
let menuTitle;
let moreTitle;
if (siteRtl == "rtl") {
    menuTitle = "منوی اصلی";
    moreTitle = "بیشتر";
}
else {
    menuTitle = "Main Menu";
    moreTitle = "More";
}
// Event Listners
document.addEventListener("DOMContentLoaded", onPageLoad);

// Functions
function onPageLoad() {
    if (siteRtl != "rtl") {
        makeMenuLTR();
    }
    if (mainMenu) {
        initMenu();
    }
}

function initMenu() {
    let smMenu = $('#espritmenu').clone();

    // Making Mmenu for phone
    $('#espritmenu > ul').removeClass("sm sm-rtl sm-simple");
    initMmenu();

    // Add clone of menu for desktop menu
    $('.header__menu').append(smMenu);


    initSmMenu();
}

// Initial Phone Menu
function initMmenu() {
    (function (e) { new Mmenu(mainMenu, { extensions: ["light", "shadow-page", "shadow-panels", "position-front", "position-right", "pagedim-black", "fx-panels-slide-100", "fx-listitems-slide"], navbars: [, !0], navbar: { add: !0, title: menuTitle } }, { clone: 0 }) }).apply(this, [jQuery]);
}

// Initial Desktop Menu
function initSmMenu() {
    //fixing the more button for smart menu
    (function ($) {

        $.SmartMenus.prototype.old_init = $.SmartMenus.prototype.init;
        $.SmartMenus.prototype.init = function (refresh) {
            if (!refresh && !this.$root.hasClass('sm-vertical')) {
                var $originalItems = this.$root.children('li'),
                    $moreSub = this.$root.clone().removeAttr('id').removeAttr('class').addClass('dropdown-menu'),
                    $moreSubItems = $moreSub.children('li'),
                    $moreItem = $('<li><a href="#">' + moreTitle + '<span class="caret"></span></a></li>').append($moreSub).appendTo(this.$root),
                    self = this,
                    vieportW,
                    hiddenItems = [],
                    hiddenMoreItems = [];
            }

            this.old_init(refresh);

            if (!refresh && !this.$root.hasClass('sm-vertical')) {
                function handleResize(force) {
                    var curWidth = $(window).width();
                    if (vieportW !== curWidth || force) {
                        // hide More item
                        $moreItem.detach();

                        // show all main menu items
                        $.each(hiddenItems, function () {
                            $(this).appendTo(self.$root);
                        });
                        hiddenItems = [];

                        // show all More sub items
                        $.each(hiddenMoreItems, function () {
                            $(this).prependTo($moreSub);
                        });
                        hiddenMoreItems = [];

                        // if in desktop view and the last item is wrapped
                        if (!self.$root.hasClass('sm-vertical') && (/^(left|right)$/.test(self.$firstLink.parent().css('float')) || self.$firstLink.parent().css('display') == 'table-cell') && $originalItems.eq(-1)[0].offsetTop != $originalItems.eq(0)[0].offsetTop) {
                            // show More item
                            $moreItem.appendTo(self.$root);

                            // while the More item is wrapped
                            while ($moreItem[0].offsetTop != $originalItems.eq(0)[0].offsetTop) {
                                hiddenItems.unshift($moreItem.prev('li').detach());
                            };

                            // hide proper More sub items
                            $moreSubItems.slice(0, $moreSubItems.length - hiddenItems.length).each(function () {
                                hiddenMoreItems.unshift($(this).detach());
                            });
                        }

                        // save new viewport width
                        vieportW = curWidth;
                    }
                }
                handleResize();

                $(window).bind({
                    'load.smartmenus': function () {
                        handleResize(true);
                    },
                    'resize.smartmenus': handleResize
                });
            }
        };

        // Fix isCollapsible method
        $.SmartMenus.prototype.isCollapsible = function () {
            return this.$root.find('ul').eq(0).css('position') == 'static';
        };

    })(jQuery);
    //initial smart menu in desktop devices
    $(function () {
        $('#espritmenu > .sm').smartmenus({
            mainMenuSubOffsetX: -1,
            subMenusSubOffsetX: 10,
            subMenusSubOffsetY: 0
        });
    });
}

function makeMenuLTR() {
    $('.sm-rtl').removeClass("sm-rtl");
}