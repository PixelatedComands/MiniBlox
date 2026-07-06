let chatformat = game.storage.get("chatManager:format");
let joinformat = game.storage.get("chatManager:joinmsg");
let leaveformat = game.storage.get("chatManager:leavemsg");
let itemenabled = game.storage.get("chatManager:itemenabled");
let spamprot = game.storage.get("chatManager:spamprot");

let prefix = "\\gold\\\\bold\\Chat Manager\\reset\\"

console.log("[ChatManager] Reloaded")

function parseMessage(player, message) {
  let msg = chatformat;
  msg = msg.replace("*player*", player);
  msg = msg.replace("*message*", message);
  return msg
};

function parseJoinMessage(player) {
  let msg = joinformat;
  msg = msg.replace("*player*", player);
  return msg
};

function parseLeaveMessage(player) {
  let msg = leaveformat;
  msg = msg.replace("*player*", player);
  return msg
};


//DEFAULT VALUES
if (!chatformat) {
  chatformat = "\\lightgray\\*player* \\reset\\\\gray\\» \\white\\*message*";
  game.storage.set("chatManager:format", chatformat)
  game.broadcast(parseMessage(prefix, "Set chatformat to default! \\lightgray\\(" + chatformat + "\\lightgray\\)"));
};
if (!joinformat) {
  joinformat = "\\lightgray\\[\\lime\\+\\lightgray\\] \\white\\*player*";
  game.storage.set("chatManager:joinmsg", joinformat)
  game.broadcast(parseMessage(prefix, "Set joinformat to default! \\lightgray\\(" + joinformat + "\\lightgray\\)"));
};
if (!leaveformat) {
  leaveformat = "\\lightgray\\[\\red\\-\\lightgray\\] \\white\\*player*";
  game.storage.set("chatManager:leavemsg", leaveformat)
  game.broadcast(parseMessage(prefix, "Set leaveformat to default! \\lightgray\\(" + leaveformat + "\\lightgray\\)"));
};
if (!itemenabled) {
  itemenabled = true;
  game.storage.set("chatManager:itemenabled", itemenabled)
  game.broadcast(parseMessage(prefix, "Set itemenabled to default! \\lightgray\\(\\pink\\" + itemenabled + "\\lightgray\\)"));
};
if (!spamprot) {
  spamprot = true;
  game.storage.set("chatManager:spamprot", spamprot)
  game.broadcast(parseMessage(prefix, "Set spamprot to default! \\lightgray\\(\\yellow\\" + spamprot + "\\lightgray\\)"));
};


game.broadcast(parseMessage(prefix, "Set up Chat Manager!"))

function chatmanager(player) {
  
  const menu = game.gui.open(player, {
  title: "\\red\\Chat Manager",
  rows: 6,                       // 1..6 rows of 9 slots
  items: [
    { slot: 10, item: "book", name: "\\bold\\Chat Format",
      lore: [" ", "\\yellow\\Click to edit the chat format.", "\\gold\\Current Format: \\reset\\" + chatformat, " ", "\\gray\\While not technically required,", "\\gray\\*player* & *message* are recommended in your message,", "\\gray\\as, they will be replaced with their according values in chat", " ", "\\white\\You may use \\red\\c\\gold\\o\\yellow\\l\\lime\\o\\aqua\\r\\purple\\s\\white\\ and \\bold\\effects\\reset\\\\white\\ in your format."], enabled: true,
      onClick: (ctx) => {
        let x = 0
        let y = 1
        let z = 0
        game.world.setBlock(x, y, z, "stone");
        y = 2;
        game.world.setBlock(x, y, z, "oak_sign");
        
        ctx.player.sendMessage(parseMessage(prefix, "Type in the sign (lines do not matter) what'd you like the Chat Format to be! \\yellow\\(use *player* and *message* as variables)"));
        ctx.player.sendMessage(parseMessage(prefix, "\\gold\\Example: \\reset\\" + String.raw`\lightgray\ *player* \reset\\gray\» \white\*message*`));

        let p = ctx.player

        ctx.gui.close()
        
        game.gui.openSign(p, {
        pos: { x, y, z },             // an existing sign block
        onSubmit: (res) => {
            text = res.text;
            const cleanText = text.replace(/[\r\n]+/gm, "");          

            p.sendMessage(parseMessage(prefix, "Saved '" + cleanText + "\\reset\\' as \\lime\\Chat Format"))

            chatformat = cleanText
            game.storage.set("chatManager:format", cleanText);

            chatmanager(p)
            return
          },
        });
      } 
    },

    { slot: 12, item: "emerald_block", name: "\\lime\\Join Message",
      lore: [" ", "\\green\\Click to edit the join message.", "\\yellow\\Current Format: \\reset\\" + joinformat, " ", "\\gray\\While not technically required,", "\\gray\\*player* is recommended in your message,", "\\gray\\as, it will be replaced with their according values in chat", " ", "\\white\\You may use \\red\\c\\gold\\o\\yellow\\l\\lime\\o\\aqua\\r\\purple\\s\\white\\ and \\bold\\effects\\reset\\\\white\\ in your format."], enabled: true,
      onClick: (ctx) => {
        let x = 0
        let y = 1
        let z = 0
        game.world.setBlock(x, y, z, "stone");
        y = 2;
        game.world.setBlock(x, y, z, "oak_sign");
        
        ctx.player.sendMessage(parseMessage(prefix, "Type in the sign (lines do not matter) what'd you like the Join Message to be! \\yellow\\(use *player* as a variable)"));
        ctx.player.sendMessage(parseMessage(prefix, "\\pink\\Example: \\reset\\" + String.raw`\lightgray\[\lime\+\lightgray\] \white\*player*`));

        let p = ctx.player

        ctx.gui.close()
        
        game.gui.openSign(p, {
        pos: { x, y, z },             // an existing sign block
        onSubmit: (res) => {
            text = res.text;
            const cleanText = text.replace(/[\r\n]+/gm, "");          

            p.sendMessage(parseMessage(prefix, "Saved '" + cleanText + "\\reset\\' as the \\lime\\Join Message"))

            joinformat = cleanText
            game.storage.set("chatManager:joinmsg", cleanText);

            chatmanager(p)
            return
          },
        });
      } 
    },

    { slot: 14, item: "redstone_block", name: "\\red\\Leave Message",
      lore: [" ", "\\darkred\\Click to edit the leave message.", "\\yellow\\Current Format: \\reset\\" + leaveformat, " ", "\\gray\\While not technically required,", "\\gray\\*player* is recommended in your message,", "\\gray\\as, it will be replaced with their according values in chat", " ", "\\white\\You may use \\red\\c\\gold\\o\\yellow\\l\\lime\\o\\aqua\\r\\purple\\s\\white\\ and \\bold\\effects\\reset\\\\white\\ in your format."], enabled: true,
      onClick: (ctx) => {
        let x = 0
        let y = 1
        let z = 0
        game.world.setBlock(x, y, z, "stone");
        y = 2;
        game.world.setBlock(x, y, z, "oak_sign");
        
        ctx.player.sendMessage(parseMessage(prefix, "Type in the sign (lines do not matter) what'd you like the Leave Message to be! \\yellow\\(use *player* as a variable)"));
        ctx.player.sendMessage(parseMessage(prefix, "\\gold\\Example: \\reset\\" + String.raw`\lightgray\[\red\-\lightgray\] \white\*player*`));

        let p = ctx.player

        ctx.gui.close()
        
        game.gui.openSign(p, {
        pos: { x, y, z },             // an existing sign block
        onSubmit: (res) => {
            text = res.text;
            const cleanText = text.replace(/[\r\n]+/gm, "");          

            p.sendMessage(parseMessage(prefix, "Saved '" + cleanText + "\\reset\\' as the \\red\\Leave Message"))

            leaveformat = cleanText
            game.storage.set("chatManager:leavemsg", cleanText);

            chatmanager(p)
            return
          },
        });
      } 
    },

    { slot: 16, item: "feather", name: "\\yellow\\Toggle Spam Protection",
      lore: [" ", "\\gold\\Click to toggle", "\\white\\Enabled: \\lightgray\\" + spamprot, " ", "\\gray\\This makes it so players cannot", "\\gray\\say the same message twice in a row"], enabled: true,
      onClick: (ctx) => {
        let p = ctx.player;
        if (spamprot) {
          spamprot = false
          p.sendMessage(parseMessage(prefix, "Turned off the Spam Protection function"))
        } else {
          spamprot = true
          p.sendMessage(parseMessage(prefix, "Turned on the Spam Protection function"))
        };
        game.storage.set("chatManager:spamprot", spamprot);

        ctx.gui.close()
        game.setTimeout(() => {
          chatmanager(p)
          return
        }, 1)

      } 
    },
    

    { slot: 28, item: "item_frame", name: "\\pink\\Toggle [item]",
      lore: [" ", "\\yellow\\Click to toggle", "\\white\\Enabled: \\lime\\" + itemenabled, " ", "\\gray\\This allows users to say '[item]'", "\\gray\\or '[i]' to publish their held item in chat"], enabled: true,
      onClick: (ctx) => {
        let p = ctx.player;
        if (itemenabled) {
          itemenabled = false
          p.sendMessage(parseMessage(prefix, "Turned off the [item] function"))
        } else {
          itemenabled = true
          p.sendMessage(parseMessage(prefix, "Turned on the [item] function"))
        };
        game.storage.set("chatManager:itemenabled", itemenabled);

        ctx.gui.close()
        game.setTimeout(() => {
          chatmanager(p)
          return
        }, 1)

      } 
    },

    

    
    ],
    onClose: (ctx) => {},
  });
  //menu.setItem(13, { item: "barrier", name: "Sold out", enabled: false });
  //menu.close();
};

game.commands.register("chatmanager", { permission: "admin" }, (sender, args) => {
    sender.sendMessage(parseMessage(prefix, "Opening ChatManager GUI"))
    chatmanager(sender)
    
});

game.commands.register("viewitem", {}, (sender, args) => {
    if (args[0]) {
      let p = game.getPlayer(args[0])

      Pdata = p.getData()
      if (Pdata["shareditemCM"]) {

        const menu = game.gui.open(sender, {
        title: p.name + "'s Item'",
        rows: 3,                       // 1..6 rows of 9 slots
        items: [],
        onClose: (ctx) => {},
        });
        
        menu.setItem(13, { ...Pdata.shareditemCM, ...{enabled: false} });
      
              
      } else {
        sender.sendMessage("\\red\\This player isn't currently sharing an item!")
      };
      
    } else {
      sender.sendMessage("\\red\\1 Argument is needed for this command!")
    }
    
});


game.on("playerChat", (e) => {
  e.cancel();

  let msg = e.message;

  if (spamprot) {
  
    
    Pdata = e.player.getData()


    
    if (Pdata["prevchat"]) {
      if (Pdata["prevchat"] === msg) {
        e.player.sendMessage("\\red\\You can't send the same message twice in a row!");
        return
      }
      
      Pdata = { ...Pdata, ...{"prevchat": msg} }
      e.player.setData(Pdata);
    } else {
      Pdata["prevchat"] = msg;
      e.player.setData(Pdata);
    }
  }

  if (itemenabled) {
    if (msg.includes("[item]") || msg.includes("[i]")) {
      game.broadcast(parseMessage("\\aqua\\[ITEM]", e.player.name + " shared an item! To see it, do '\\yellow\\/viewitem " + e.player.name + "'"))
  
      Pdata = e.player.getData()
      Pdata = { ...Pdata, ...{"shareditemCM": e.player.getHeldItem()} }
      e.player.setData(Pdata);
  
      return
    };
  } else {
    e.player.sendMessage(parseMessage(prefix, "\\red\\[item] is not currently enabled!"))
    return
  };
  
  game.broadcast(parseMessage(e.player.name, e.message))
});


game.on("playerQuit", (e) => {
  e.quitMessage = parseLeaveMessage(e.player.name)
})
game.on("playerJoin", (e) => {
  e.joinMessage = parseJoinMessage(e.player.name)
})



