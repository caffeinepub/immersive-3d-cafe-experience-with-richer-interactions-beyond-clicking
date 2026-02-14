import Text "mo:core/Text";
import List "mo:core/List";
import Runtime "mo:core/Runtime";



actor {
  type ContactMessage = {
    name : Text;
    email : Text;
    message : Text;
  };

  let contactMessages = List.empty<ContactMessage>();

  public shared ({ caller }) func submitContactMessage(name : Text, email : Text, message : Text) : async () {
    if (name.size() <= 0) {
      Runtime.trap("Name cannot be empty");
    };

    let contactMessage : ContactMessage = {
      name;
      email;
      message;
    };

    contactMessages.add(contactMessage);
  };

  public query ({ caller }) func getContactMessages() : async [ContactMessage] {
    contactMessages.toArray();
  };
};
