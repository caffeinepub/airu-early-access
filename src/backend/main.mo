import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

// Enable data migration when upgrading canister

actor {
  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Type
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // User Profile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Waitlist Types
  public type WaitlistEntry = {
    id : Nat;
    name : Text;
    phone : Text;
    isWhatsApp : Bool;
    city : Text;
    timestamp : Int;
  };

  module WaitlistEntry {
    public func compare(a : WaitlistEntry, b : WaitlistEntry) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  // Waitlist Storage
  var nextEntryId = 0;
  let entries = Map.empty<Nat, WaitlistEntry>();

  // Lead Status Storage (separate map to avoid migration issues)
  let leadStatuses = Map.empty<Nat, Text>();

  // Public Functions (accessible to everyone including guests)
  public shared ({ caller }) func submitWaitlist(name : Text, phone : Text, isWhatsApp : Bool, city : Text) : async Nat {
    let id = nextEntryId;
    let entry : WaitlistEntry = {
      id;
      name;
      phone;
      isWhatsApp;
      city;
      timestamp = Time.now();
    };
    entries.add(id, entry);
    nextEntryId += 1;
    nextEntryId;
  };

  public query ({ caller }) func getCount() : async Nat {
    entries.size();
  };

  // Admin Functions (restricted to admins only)
  public query ({ caller }) func getEntries() : async [WaitlistEntry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can access entries");
    };
    entries.values().toArray().sort();
  };

  public shared ({ caller }) func deleteEntry(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete entries");
    };
    if (not entries.containsKey(id)) {
      Runtime.trap("Entry does not exist.");
    };
    entries.remove(id);
  };

  public query ({ caller }) func getLeadStatuses() : async [(Nat, Text)] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can access lead statuses");
    };
    leadStatuses.entries().toArray();
  };

  public shared ({ caller }) func updateLeadStatus(id : Nat, status : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update lead statuses");
    };
    leadStatuses.add(id, status);
  };

  // Blog Types
  public type BlogPost = {
    id : Nat;
    title : Text;
    description : Text;
    content : Text;
    publishDate : Text;
    createdAt : Int;
  };

  module BlogPost {
    public func compareCreatedAtDesc(a : BlogPost, b : BlogPost) : Order.Order {
      Int.compare(b.createdAt, a.createdAt); // Descending by createdAt
    };
  };

  // Blog Storage
  var nextPostId = 0;
  let blogPosts = Map.empty<Nat, BlogPost>();

  // Blog Functions
  public shared ({ caller }) func createPost(title : Text, description : Text, content : Text, publishDate : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create posts");
    };

    let id = nextPostId;
    let post : BlogPost = {
      id;
      title;
      description;
      content;
      publishDate;
      createdAt = Time.now();
    };

    blogPosts.add(id, post);
    nextPostId += 1;
    id;
  };

  public shared ({ caller }) func updatePost(id : Nat, title : Text, description : Text, content : Text, publishDate : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update posts");
    };

    switch (blogPosts.get(id)) {
      case (?existingPost) {
        let updatedPost : BlogPost = {
          id;
          title;
          description;
          content;
          publishDate;
          createdAt = existingPost.createdAt;
        };
        blogPosts.add(id, updatedPost);
      };
      case (null) {
        Runtime.trap("Post does not exist.");
      };
    };
  };

  public shared ({ caller }) func deletePost(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete posts");
    };
    if (not blogPosts.containsKey(id)) {
      Runtime.trap("Post does not exist.");
    };
    blogPosts.remove(id);
  };

  public query ({ caller }) func listPosts() : async [BlogPost] {
    blogPosts.values().toArray().sort(BlogPost.compareCreatedAtDesc);
  };

  public query ({ caller }) func getPost(id : Nat) : async ?BlogPost {
    blogPosts.get(id);
  };
};
