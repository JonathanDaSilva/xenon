var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var src_1 = require("../../../src");
var ChatForm = (function (_super) {
    __extends(ChatForm, _super);
    function ChatForm() {
        _super.apply(this, arguments);
    }
    ChatForm.prototype.sendMessage = function (message) {
        this.message.type(message);
        this.sendAction.click();
    };
    __decorate([
        src_1.field(src_1.Component, { qa: "message" }), 
        __metadata('design:type', src_1.Component)
    ], ChatForm.prototype, "message");
    __decorate([
        src_1.field(src_1.Component, { css: "#sendMessage" }), 
        __metadata('design:type', src_1.Component)
    ], ChatForm.prototype, "sendAction");
    __decorate([
        src_1.field(src_1.Component, { css: "#missingAction" }), 
        __metadata('design:type', src_1.Component)
    ], ChatForm.prototype, "missingAction");
    ChatForm = __decorate([
        src_1.defaults({ qa: "chat-form" }), 
        __metadata('design:paramtypes', [])
    ], ChatForm);
    return ChatForm;
})(src_1.Component);
var UserForm = (function (_super) {
    __extends(UserForm, _super);
    function UserForm() {
        _super.apply(this, arguments);
    }
    UserForm.prototype.login = function (name) {
        this.username.type(name);
        this.sendAction.click();
    };
    __decorate([
        src_1.field(src_1.Component, { qa: "username" }), 
        __metadata('design:type', src_1.Component)
    ], UserForm.prototype, "username");
    __decorate([
        src_1.field(src_1.Component, { qa: "send-action" }), 
        __metadata('design:type', src_1.Component)
    ], UserForm.prototype, "sendAction");
    UserForm = __decorate([
        src_1.defaults({ qa: "user-form" }), 
        __metadata('design:paramtypes', [])
    ], UserForm);
    return UserForm;
})(src_1.Component);
var Message = (function (_super) {
    __extends(Message, _super);
    function Message() {
        _super.apply(this, arguments);
    }
    Message.states = {
        LATEST: "latest"
    };
    __decorate([
        src_1.field(src_1.Component, { qa: "message--msg" }), 
        __metadata('design:type', src_1.Component)
    ], Message.prototype, "msg");
    __decorate([
        src_1.field(src_1.Component, { qa: "message--user" }), 
        __metadata('design:type', src_1.Component)
    ], Message.prototype, "user");
    Message = __decorate([
        src_1.defaults({ states: Message.states }), 
        __metadata('design:paramtypes', [])
    ], Message);
    return Message;
})(src_1.Component);
var ChatPage = (function (_super) {
    __extends(ChatPage, _super);
    function ChatPage() {
        _super.apply(this, arguments);
    }
    __decorate([
        src_1.field(src_1.Component, { qa: "options--select" }), 
        __metadata('design:type', src_1.Component)
    ], ChatPage.prototype, "menu");
    __decorate([
        src_1.field(ChatForm), 
        __metadata('design:type', ChatForm)
    ], ChatPage.prototype, "chatForm");
    __decorate([
        src_1.field(UserForm), 
        __metadata('design:type', UserForm)
    ], ChatPage.prototype, "userForm");
    __decorate([
        src_1.field(src_1.Component, { css: "h4" }), 
        __metadata('design:type', src_1.Component)
    ], ChatPage.prototype, "title");
    __decorate([
        src_1.field(src_1.List, { qa: "messages", itemQA: "message", itemType: Message }), 
        __metadata('design:type', src_1.List)
    ], ChatPage.prototype, "messageList");
    return ChatPage;
})(src_1.Component);
describe("example", function () {
    it("should pass", function () {
        browser.get("http://localhost:3002");
        var chatPage = new ChatPage();
        expect(chatPage.title.getText()).toBe("A simple chat system");
        expect(chatPage.userForm.username.isVisible()).toBe(true);
        chatPage.userForm.username.type("bob");
        chatPage.userForm.sendAction.click();
        expect(chatPage.userForm.isNotVisible()).toBe(true);
        expect(chatPage.chatForm.isVisible()).toBe(true);
        chatPage.chatForm.message.type("Hi everyone");
        expect(chatPage.chatForm.message.getText()).toBe("Hi everyone");
        chatPage.chatForm.sendAction.click();
        expect(chatPage.messageList.get(0).msg.getText()).toBe("Hi everyone");
        expect(chatPage.messageList.count()).toBe(1);
        var firstMessage = chatPage.messageList.getByText("Hi everyon", false);
        expect(firstMessage.user.getText()).toBe("bob");
        expect(firstMessage.msg.getText()).toBe("Hi everyone");
        chatPage.chatForm.sendMessage("new reply 2");
        expect(chatPage.messageList.count()).toBe(2);
        var secondMessage = chatPage.messageList.get(1);
        expect(secondMessage.user.getText()).toBe("bob");
        chatPage.menu.selectOption("clear messages");
        expect(chatPage.messageList.count()).toBe(0);
        chatPage.menu.selectOption("logout");
        chatPage.userForm.login("joe");
        chatPage.chatForm.sendMessage("new reply");
        var firstReply = chatPage.messageList.get(0);
        expect(firstReply.user.getText()).toBe("joe");
        expect(firstReply.is(Message.states.LATEST)).toBe(true);
        expect(firstReply.user.getElement().getText()).toBe("joe");
    });
});
//# sourceMappingURL=TestSpec.js.map