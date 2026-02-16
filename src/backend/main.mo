import Text "mo:core/Text";
import VarArray "mo:core/VarArray";
import Runtime "mo:core/Runtime";

actor {
  type ContactMessage = {
    name : Text;
    email : Text;
    message : Text;
  };

  var contactMessages : [var ContactMessage] = [var];

  public shared ({ caller }) func submitContactMessage(name : Text, email : Text, message : Text) : async () {
    if (name.size() == 0) {
      Runtime.trap("Name cannot be empty");
    };

    let contactMessage : ContactMessage = {
      name;
      email;
      message;
    };

    let newContactMessages = VarArray.tabulate<ContactMessage>(contactMessages.size() + 1, func(i) { if (i == contactMessages.size()) { contactMessage } else { contactMessages[i] } });
    contactMessages := newContactMessages;
  };

  public query ({ caller }) func getContactMessages() : async [ContactMessage] {
    contactMessages.toArray();
  };
};
