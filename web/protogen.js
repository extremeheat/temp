const toTransform = {
  "!version": "1.16.220",
  "string": [
    "pstring",
    {
      "countType": "varint"
    }
  ],
  "ByteArray": [
    "buffer",
    {
      "countType": "varint"
    }
  ],
  "SignedByteArray": [
    "buffer",
    {
      "countType": "zigzag32"
    }
  ],
  "LittleString": [
    "pstring",
    {
      "countType": "li32"
    }
  ],
  "ShortArray": [
    "buffer",
    {
      "countType": "li16"
    }
  ],
  "varint32": "varint",
  "bool": "native",
  "zigzag32": "native",
  "zigzag64": "native",
  "uuid": "native",
  "byterot": "native",
  "MapInfo": "native",
  "nbt": "native",
  "!StartDocs,,22": "Types",
  "%array,BehaviourPackInfos,,li16": {
    "uuid": "string",
    "version": "string",
    "size": "lu64",
    "content_key": "string",
    "sub_pack_name": "string",
    "content_identity": "string",
    "has_scripts": "bool"
  },
  "%array,TexturePackInfos,,li16": {
    "uuid": "string",
    "version": "string",
    "size": "lu64",
    "content_key": "string",
    "sub_pack_name": "string",
    "content_identity": "string",
    "has_scripts": "bool",
    "rtx_enabled": "bool"
  },
  "%array,ResourcePackIdVersions,,varint": {
    "!comment,44": "The ID of the resource pack.\n",
    "uuid": "string",
    "!comment,46": "The version of the resource pack.\n",
    "version": "string",
    "!comment,48": "The subpack name of the resource pack.\n",
    "name": "string"
  },
  "%array,ResourcePackIds,string,li16": null,
  "%container,Experiment,": {
    "name": "string",
    "enabled": "bool"
  },
  "%array,Experiments,Experiment,li32": null,
  "%map,GameMode,zigzag32": {
    "%n,0": "survival",
    "%n,1": "creative",
    "%n,2": "adventure",
    "%n,3": "survival_spectator",
    "%n,4": "creative_spectator",
    "%n,5": "fallback"
  },
  "%container,GameRule,": {
    "name": "string",
    "%map,type,varint": {
      "%n,1": "bool",
      "%n,2": "int",
      "%n,3": "float"
    },
    "%switch,value,type": {
      "if bool": "bool",
      "if int": "zigzag32",
      "if float": "lf32"
    }
  },
  "%array,GameRules,GameRule,varint": null,
  "!comment,80": "CacheBlob represents a blob as used in the client side blob cache protocol. It holds a hash of its data and\nthe full data of it.\n",
  "%container,Blob,": {
    "!comment,83": "Hash is the hash of the blob. The hash is computed using xxHash, and must be deterministic for the same\nchunk data.\n",
    "hash": "lu64",
    "!comment,86": "Payload is the data of the blob. When sent, the client will associate the Hash of the blob with the\nPayload in it.\n",
    "payload": "ByteArray"
  },
  "%array,BlockProperties,,varint": {
    "name": "string",
    "state": "nbt"
  },
  "%array,Itemstates,,varint": {
    "name": "string",
    "runtime_id": "li16",
    "component_based": "bool"
  },
  "%container,ItemExtraDataWithBlockingTick,": {
    "%map,has_nbt,lu16": {
      "%n,65535": "true",
      "%n,0": "false"
    },
    "%switch,nbt,has_nbt": {
      "if true": {
        "version": "u8",
        "nbt": "lnbt"
      },
      "default": "void"
    },
    "%array,can_place_on,ShortArray,li32": null,
    "%array,can_destroy,ShortArray,li32": null,
    "blocking_tick": "li64"
  },
  "%container,ItemExtraDataWithoutBlockingTick,": {
    "%map,has_nbt,lu16": {
      "%n,65535": "true",
      "%n,0": "false"
    },
    "%switch,nbt,has_nbt": {
      "if true": {
        "version": "u8",
        "nbt": "lnbt"
      },
      "default": "void"
    },
    "%array,can_place_on,ShortArray,li32": null,
    "%array,can_destroy,ShortArray,li32": null
  },
  "!comment,126": "Same as below but without a \"networkStackID\" boolean\n",
  "%container,ItemLegacy,": {
    "network_id": "zigzag32",
    "%switch,__129,network_id": {
      "if 0": "void",
      "%container,default,": {
        "count": "lu16",
        "metadata": "varint",
        "block_runtime_id": "zigzag32",
        "%switch,extra,network_id": {
          "if 355": "[\"encapsulated\", { \"lengthType\": \"varint\", \"type\": \"ItemExtraDataWithBlockingTick\" }]",
          "default": "[\"encapsulated\", { \"lengthType\": \"varint\", \"type\": \"ItemExtraDataWithoutBlockingTick\" }]"
        }
      }
    }
  },
  "!comment,139": "An \"ItemStack\" here represents an Item instance. You can think about it like a pointer\nto an item class. The data for the class gets updated with the data in the `item` field\n",
  "!comment,141": "As of 1.16.220, now functionally the same as `Item` just without an extra boolean when\nserver auth inventories is disabled.\n",
  "%container,Item,": {
    "network_id": "zigzag32",
    "%switch,__145,network_id": {
      "if 0": "void",
      "%container,default,": {
        "count": "lu16",
        "metadata": "varint",
        "!comment,150": "When server authoritative inventory is enabled, all allocated items have a unique ID used to identify\na specifc item instance.\n",
        "has_stack_id": "u8",
        "!comment,153": "StackNetworkID is the network ID of the item stack. If the stack is empty, 0 is always written for this\nfield. If not, the field should be set to 1 if the server authoritative inventories are disabled in the\n",
        "!comment,155": "StartGame packet, or to a unique stack ID if it is enabled.\n",
        "%switch,stack_id,has_stack_id": {
          "if 0": "void",
          "default": "zigzag32"
        },
        "block_runtime_id": "zigzag32",
        "%switch,extra,network_id": {
          "if 355": "[\"encapsulated\", { \"lengthType\": \"varint\", \"type\": \"ItemExtraDataWithBlockingTick\" }]",
          "default": "[\"encapsulated\", { \"lengthType\": \"varint\", \"type\": \"ItemExtraDataWithoutBlockingTick\" }]"
        }
      }
    }
  },
  "%container,vec3i,": {
    "x": "zigzag32",
    "y": "zigzag32",
    "z": "zigzag32"
  },
  "%container,vec3u,": {
    "x": "varint",
    "y": "varint",
    "z": "varint"
  },
  "%container,vec3f,": {
    "x": "lf32",
    "y": "lf32",
    "z": "lf32"
  },
  "%container,vec2f,": {
    "x": "lf32",
    "z": "lf32"
  },
  "%array,MetadataDictionary,,varint": {
    "!comment,184": "https://github.com/pmmp/PocketMine-MP/blob/stable/src/pocketmine/entity/Entity.php#L101\n",
    "%map,key,varint": {
      "%n,0": "flags",
      "%n,1": "health",
      "%n,2": "variant",
      "%n,3": "color",
      "%n,4": "nametag",
      "%n,5": "owner_eid",
      "%n,6": "target_eid",
      "%n,7": "air",
      "%n,8": "potion_color",
      "%n,9": "potion_ambient",
      "%n,10": "jump_duration",
      "%n,11": "hurt_time",
      "%n,12": "hurt_direction",
      "%n,13": "paddle_time_left",
      "%n,14": "paddle_time_right",
      "%n,15": "experience_value",
      "%n,16": "minecart_display_block",
      "%n,17": "minecart_display_offset",
      "%n,18": "minecart_has_display",
      "%n,20": "old_swell",
      "%n,21": "swell_dir",
      "%n,22": "charge_amount",
      "%n,23": "enderman_held_runtime_id",
      "%n,24": "entity_age",
      "%n,26": "player_flags",
      "%n,27": "player_index",
      "%n,28": "player_bed_position",
      "%n,29": "fireball_power_x",
      "%n,30": "fireball_power_y",
      "%n,31": "fireball_power_z",
      "%n,32": "aux_power",
      "%n,33": "fish_x",
      "%n,34": "fish_z",
      "%n,35": "fish_angle",
      "%n,36": "potion_aux_value",
      "%n,37": "lead_holder_eid",
      "%n,38": "scale",
      "%n,39": "interactive_tag",
      "%n,40": "npc_skin_id",
      "%n,41": "url_tag",
      "%n,42": "max_airdata_max_air",
      "%n,43": "mark_variant",
      "%n,44": "container_type",
      "%n,45": "container_base_size",
      "%n,46": "container_extra_slots_per_strength",
      "%n,47": "block_target",
      "%n,48": "wither_invulnerable_ticks",
      "%n,49": "wither_target_1",
      "%n,50": "wither_target_2",
      "%n,51": "wither_target_3",
      "%n,52": "aerial_attack",
      "%n,53": "boundingbox_width",
      "%n,54": "boundingbox_height",
      "%n,55": "fuse_length",
      "%n,56": "rider_seat_position",
      "%n,57": "rider_rotation_locked",
      "%n,58": "rider_max_rotation",
      "%n,59": "rider_min_rotation",
      "%n,60": "rider_rotation_offset",
      "%n,61": "area_effect_cloud_radius",
      "%n,62": "area_effect_cloud_waiting",
      "%n,63": "area_effect_cloud_particle_id",
      "%n,64": "shulker_peek_id",
      "%n,65": "shulker_attach_face",
      "%n,66": "shulker_attached",
      "%n,67": "shulker_attach_pos",
      "%n,68": "trading_player_eid",
      "%n,69": "trading_career",
      "%n,70": "has_command_block",
      "%n,71": "command_block_command",
      "%n,72": "command_block_last_output",
      "%n,73": "command_block_track_output",
      "%n,74": "controlling_rider_seat_number",
      "%n,75": "strength",
      "%n,76": "max_strength",
      "%n,77": "spell_casting_color",
      "%n,78": "limited_life",
      "%n,79": "armor_stand_pose_index",
      "%n,80": "ender_crystal_time_offset",
      "%n,81": "always_show_nametag",
      "%n,82": "color_2",
      "%n,83": "name_author",
      "%n,84": "score_tag",
      "%n,85": "balloon_attached_entity",
      "%n,86": "pufferfish_size",
      "%n,87": "bubble_time",
      "%n,88": "agent",
      "%n,89": "sitting_amount",
      "%n,90": "sitting_amount_previous",
      "%n,91": "eating_counter",
      "%n,92": "flags_extended",
      "%n,93": "laying_amount",
      "%n,94": "laying_amount_previous",
      "%n,95": "duration",
      "%n,96": "spawn_time",
      "%n,97": "change_rate",
      "%n,98": "change_on_pickup",
      "%n,99": "pickup_count",
      "%n,100": "interact_text",
      "%n,101": "trade_tier",
      "%n,102": "max_trade_tier",
      "%n,103": "trade_experience",
      "%n,104": "skin_id",
      "%n,105": "spawning_frames",
      "%n,106": "command_block_tick_delay",
      "%n,107": "command_block_execute_on_first_tick",
      "%n,108": "ambient_sound_interval",
      "%n,109": "ambient_sound_interval_range",
      "%n,110": "ambient_sound_event_name",
      "%n,111": "fall_damage_multiplier",
      "%n,112": "name_raw_text",
      "%n,113": "can_ride_target",
      "%n,114": "low_tier_cured_discount",
      "%n,115": "high_tier_cured_discount",
      "%n,116": "nearby_cured_discount",
      "%n,117": "nearby_cured_discount_timestamp",
      "%n,118": "hitbox",
      "%n,119": "is_buoyant",
      "%n,120": "buoyancy_data",
      "%n,121": "goat_horn_count"
    },
    "%map,type,varint": {
      "%n,0": "byte",
      "%n,1": "short",
      "%n,2": "int",
      "%n,3": "float",
      "%n,4": "string",
      "%n,5": "compound",
      "%n,6": "vec3i",
      "%n,7": "long",
      "%n,8": "vec3f"
    },
    "%switch,value,key": {
      "if flags": "MetadataFlags1",
      "if flags_extended": "MetadataFlags2",
      "%switch,default,type": {
        "if byte": "i8",
        "if short": "li16",
        "if int": "zigzag32",
        "if float": "lf32",
        "if string": "string",
        "if compound": "nbt",
        "if vec3i": "vec3i",
        "if long": "zigzag64",
        "if vec3f": "vec3f"
      }
    }
  },
  "MetadataFlags1": [
    "bitflags",
    {
      "type": "zigzag64",
      "big": true,
      "flags": [
        "onfire",
        "sneaking",
        "riding",
        "sprinting",
        "action",
        "invisible",
        "tempted",
        "inlove",
        "saddled",
        "powered",
        "ignited",
        "baby",
        "converting",
        "critical",
        "can_show_nametag",
        "always_show_nametag",
        "no_ai",
        "silent",
        "wallclimbing",
        "can_climb",
        "swimmer",
        "can_fly",
        "walker",
        "resting",
        "sitting",
        "angry",
        "interested",
        "charged",
        "tamed",
        "orphaned",
        "leashed",
        "sheared",
        "gliding",
        "elder",
        "moving",
        "breathing",
        "chested",
        "stackable",
        "showbase",
        "rearing",
        "vibrating",
        "idling",
        "evoker_spell",
        "charge_attack",
        "wasd_controlled",
        "can_power_jump",
        "linger",
        "has_collision",
        "affected_by_gravity",
        "fire_immune",
        "dancing",
        "enchanted",
        "show_trident_rope",
        "container_private",
        "transforming",
        "spin_attack",
        "swimming",
        "bribed",
        "pregnant",
        "laying_egg",
        "rider_can_pick",
        "transition_sitting",
        "eating",
        "laying_down"
      ]
    }
  ],
  "MetadataFlags2": [
    "bitflags",
    {
      "type": "zigzag64",
      "big": true,
      "flags": [
        "sneezing",
        "trusting",
        "rolling",
        "scared",
        "in_scaffolding",
        "over_scaffolding",
        "fall_through_scaffolding",
        "blocking",
        "transition_blocking",
        "blocked_using_shield",
        "blocked_using_damaged_shield",
        "sleeping",
        "wants_to_wake",
        "trade_interest",
        "door_breaker",
        "breaking_obstruction",
        "door_opener",
        "illager_captain",
        "stunned",
        "roaring",
        "delayed_attacking",
        "avoiding_mobs",
        "avoiding_block",
        "facing_target_to_range_attack",
        "hidden_when_invisible",
        "is_in_ui",
        "stalking",
        "emoting",
        "celebrating",
        "admiring",
        "celebrating_special"
      ]
    }
  ],
  "%container,Link,": {
    "ridden_entity_id": "zigzag64",
    "rider_entity_id": "zigzag64",
    "type": "u8",
    "immediate": "bool",
    "rider_initiated": "bool"
  },
  "%array,Links,Link,varint": null,
  "%array,EntityAttributes,,varint": {
    "name": "string",
    "min": "lf32",
    "value": "lf32",
    "max": "lf32"
  },
  "%container,Rotation,": {
    "yaw": "byterot",
    "pitch": "byterot",
    "head_yaw": "byterot"
  },
  "%container,BlockCoordinates,# mojang...": {
    "x": "zigzag32",
    "y": "varint",
    "z": "zigzag32"
  },
  "%array,PlayerAttributes,,varint": {
    "min": "lf32",
    "max": "lf32",
    "current": "lf32",
    "default": "lf32",
    "name": "string"
  },
  "!comment,471": "UseItemTransactionData represents an inventory transaction data object sent when the client uses an item on\na block. Also used in PlayerAuthoritativeInput packet\n",
  "%container,TransactionUseItem,": {
    "!comment,474": "ActionType is the type of the UseItem inventory transaction. It is one of the action types found above,\nand specifies the way the player interacted with the block.\n",
    "%map,action_type,varint": {
      "%n,0": "click_block",
      "%n,1": "click_air",
      "%n,2": "break_block"
    },
    "!comment,480": "BlockPosition is the position of the block that was interacted with. This is only really a correct\nblock position if ActionType is not UseItemActionClickAir.\n",
    "block_position": "vec3i",
    "!comment,483": "BlockFace is the face of the block that was interacted with. When clicking the block, it is the face\nclicked. When breaking the block, it is the face that was last being hit until the block broke.\n",
    "face": "varint",
    "!comment,486": "HotBarSlot is the hot bar slot that the player was holding while clicking the block. It should be used\nto ensure that the hot bar slot and held item are correctly synchronised with the server.\n",
    "hotbar_slot": "varint",
    "!comment,489": "HeldItem is the item that was held to interact with the block. The server should check if this item\nis actually present in the HotBarSlot.\n",
    "held_item": "Item",
    "!comment,492": "Position is the position of the player at the time of interaction. For clicking a block, this is the\nposition at that time, whereas for breaking the block it is the position at the time of breaking.\n",
    "player_pos": "vec3f",
    "!comment,495": "ClickedPosition is the position that was clicked relative to the block's base coordinate. It can be\nused to find out exactly where a player clicked the block.\n",
    "click_pos": "vec3f",
    "!comment,498": "BlockRuntimeID is the runtime ID of the block that was clicked. It may be used by the server to verify\nthat the player's world client-side is synchronised with the server's.\n",
    "block_runtime_id": "varint"
  },
  "!comment,502": "Actions is a list of actions that took place, that form the inventory transaction together. Each of\nthese actions hold one slot in which one item was changed to another. In general, the combination of\n",
  "!comment,504": "all of these actions results in a balanced inventory transaction. This should be checked to ensure that\nno items are cheated into the inventory.\n",
  "%array,TransactionActions,,varint": {
    "%map,source_type,varint": {
      "%n,0": "container",
      "%n,1": "global",
      "%n,2": "world_interaction",
      "%n,3": "creative",
      "%n,100": "craft_slot",
      "%n,99999": "craft"
    },
    "%switch,__514,source_type": {
      "if container or craft": {
        "inventory_id": "WindowIDVarint"
      },
      "if world_interaction": {
        "flags": "varint"
      },
      "if craft or craft_slot": {
        "action": "varint"
      },
      "default": "void"
    },
    "slot": "varint",
    "old_item": "Item",
    "new_item": "Item"
  },
  "!comment,526": "The Minecraft bedrock inventory system was refactored, but not all inventory actions use the new packet.\nThis data structure holds actions that have not been updated to the new system.\n",
  "%container,TransactionLegacy,": {
    "!comment,529": "LegacyRequestID is an ID that is only non-zero at times when sent by the client. The server should\nalways send 0 for this. When this field is not 0, the LegacySetItemSlots slice below will have values\n",
    "!comment,531": "in it.\nLegacyRequestID ties in with the ItemStackResponse packet. If this field is non-0, the server should\n",
    "!comment,533": "respond with an ItemStackResponse packet. Some inventory actions such as dropping an item out of the\nhotbar are still one using this packet, and the ItemStackResponse packet needs to tie in with it.\n",
    "legacy_request_id": "zigzag32",
    "!comment,536": "`legacy_transactions` are only present if the LegacyRequestID is non-zero. These item slots inform the\nserver of the slots that were changed during the inventory transaction, and the server should send\n",
    "!comment,538": "back an ItemStackResponse packet with these slots present in it. (Or false with no slots, if rejected.)\n",
    "%switch,legacy_transactions,legacy_request_id": {
      "if 0": "void",
      "%array,default,,varint": {
        "container_id": "u8",
        "%array,changed_slots,,varint": {
          "slot_id": "u8"
        }
      }
    }
  },
  "%container,Transaction,": {
    "!comment,547": "Old transaction system data\n",
    "legacy": "TransactionLegacy",
    "!comment,549": "What type of transaction took place\n",
    "%map,transaction_type,varint": {
      "%n,0": "normal",
      "%n,1": "inventory_mismatch",
      "%n,2": "item_use",
      "%n,3": "item_use_on_entity",
      "%n,4": "item_release"
    },
    "!comment,556": "The list of inventory internal actions in this packet, e.g. inventory GUI actions\n",
    "actions": "TransactionActions",
    "!comment,558": "Extra data if an intenal inventory transaction did not take place, e.g. use of an item \n",
    "%switch,transaction_data,transaction_type": {
      "if normal or inventory_mismatch": "void",
      "!comment,561": "UseItemTransactionData represents an inventory transaction data object sent when the client uses an item on\na block.\n",
      "if item_use": "TransactionUseItem",
      "!comment,564": "UseItemOnEntityTransactionData represents an inventory transaction data object sent when the client uses\nan item on an entity.\n",
      "if item_use_on_entity": {
        "!comment,567": "TargetEntityRuntimeID is the entity runtime ID of the target that was clicked. It is the runtime ID\nthat was assigned to it in the AddEntity packet.\n",
        "entity_runtime_id": "varint64",
        "!comment,570": "ActionType is the type of the UseItemOnEntity inventory transaction. It is one of the action types\nfound in the constants above, and specifies the way the player interacted with the entity.\n",
        "%map,action_type,varint": {
          "%n,0": "interact",
          "%n,1": "attack"
        },
        "!comment,575": "HotBarSlot is the hot bar slot that the player was holding while clicking the entity. It should be used\nto ensure that the hot bar slot and held item are correctly synchronised with the server.\n",
        "hotbar_slot": "zigzag32",
        "!comment,578": "HeldItem is the item that was held to interact with the entity. The server should check if this item\nis actually present in the HotBarSlot.\n",
        "held_item": "Item",
        "!comment,581": "Position is the position of the player at the time of clicking the entity.\n",
        "player_pos": "vec3f",
        "!comment,583": "ClickedPosition is the position that was clicked relative to the entity's base coordinate. It can be\nused to find out exactly where a player clicked the entity.\n",
        "click_pos": "vec3f"
      },
      "!comment,586": "ReleaseItemTransactionData represents an inventory transaction data object sent when the client releases\nthe item it was using, for example when stopping while eating or stopping the charging of a bow.        \n",
      "if item_release": {
        "!comment,589": "ActionType is the type of the ReleaseItem inventory transaction. It is one of the action types found\nin the constants above, and specifies the way the item was released.\n",
        "!comment,591": "As of 1.13, the ActionType is always 0. This field can be ignored, because releasing food (by consuming\nit) or releasing a bow (to shoot an arrow) is essentially the same.\n",
        "%map,action_type,varint": {
          "%n,0": "release",
          "%n,1": "consume"
        },
        "!comment,596": "HotBarSlot is the hot bar slot that the player was holding while releasing the item. It should be used\nto ensure that the hot bar slot and held item are correctly synchronised with the server.\n",
        "hotbar_slot": "zigzag32",
        "!comment,599": "HeldItem is the item that was released. The server should check if this item is actually present in the\nHotBarSlot.\n",
        "held_item": "Item",
        "!comment,602": "HeadPosition is the position of the player's head at the time of releasing the item. This is used\nmainly for purposes such as spawning eating particles at that position.\n",
        "head_pos": "vec3f"
      }
    }
  },
  "%array,ItemStacks,Item,varint": null,
  "%container,RecipeIngredient,": {
    "network_id": "zigzag32",
    "%switch,__610,network_id": {
      "if 0": "void",
      "%container,default,": {
        "network_data": "zigzag32",
        "count": "zigzag32"
      }
    }
  },
  "%array,PotionTypeRecipes,,varint": {
    "input_item_id": "zigzag32",
    "input_item_meta": "zigzag32",
    "ingredient_id": "zigzag32",
    "ingredient_meta": "zigzag32",
    "output_item_id": "zigzag32",
    "output_item_meta": "zigzag32"
  },
  "%array,PotionContainerChangeRecipes,,varint": {
    "input_item_id": "zigzag32",
    "ingredient_id": "zigzag32",
    "output_item_id": "zigzag32"
  },
  "%array,Recipes,,varint": {
    "%map,type,zigzag32": {
      "%n,0": "shapeless",
      "%n,1": "shaped",
      "%n,2": "furnace",
      "!comment,634": "`furnace_with_metadata` is a recipe specifically used for furnace-type crafting stations. It is equal to\n`furnace`, except it has an input item with a specific metadata value, instead of any metadata value.\n",
      "%n,3": "furnace_with_metadata",
      "%n,4": "multi",
      "%n,5": "shulker_box",
      "%n,6": "shapeless_chemistry",
      "%n,7": "shaped_chemistry"
    },
    "%switch,recipe,type": {
      "if shapeless or shulker_box or shapeless_chemistry": {
        "recipe_id": "string",
        "%array,input,RecipeIngredient,varint": null,
        "%array,output,ItemLegacy,varint": null,
        "uuid": "uuid",
        "block": "string",
        "priority": "zigzag32",
        "network_id": "varint"
      },
      "if shaped or shaped_chemistry": {
        "recipe_id": "string",
        "width": "zigzag32",
        "height": "zigzag32",
        "!comment,654": "2D input array, size of width*height\n",
        "%array,input,,$width": {
          "%array,__656,RecipeIngredient,$height": null
        },
        "%array,output,ItemLegacy,varint": null,
        "uuid": "uuid",
        "block": "string",
        "priority": "zigzag32",
        "network_id": "varint"
      },
      "if furnace": {
        "input_id": "zigzag32",
        "output": "ItemLegacy",
        "block": "string"
      },
      "if furnace_with_metadata": {
        "input_id": "zigzag32",
        "input_meta": "zigzag32",
        "output": "ItemLegacy",
        "block": "string"
      },
      "if multi": {
        "uuid": "uuid",
        "network_id": "varint"
      }
    }
  },
  "%container,SkinImage,": {
    "width": "li32",
    "height": "li32",
    "data": "ByteArray"
  },
  "%container,Skin,": {
    "skin_id": "string",
    "play_fab_id": "string",
    "skin_resource_pack": "string",
    "skin_data": "SkinImage",
    "%array,animations,,li32": {
      "skin_image": "SkinImage",
      "animation_type": "li32",
      "animation_frames": "lf32",
      "expression_type": "lf32"
    },
    "cape_data": "SkinImage",
    "geometry_data": "string",
    "animation_data": "string",
    "premium": "bool",
    "persona": "bool",
    "cape_on_classic": "bool",
    "cape_id": "string",
    "full_skin_id": "string",
    "arm_size": "string",
    "skin_color": "string",
    "%array,personal_pieces,,li32": {
      "piece_id": "string",
      "piece_type": "string",
      "pack_id": "string",
      "is_default_piece": "bool",
      "product_id": "string"
    },
    "%array,piece_tint_colors,,li32": {
      "piece_type": "string",
      "%array,colors,string,li32": null
    }
  },
  "%container,PlayerRecords,": {
    "%map,type,u8": {
      "%n,0": "add",
      "%n,1": "remove"
    },
    "records_count": "varint",
    "%array,records,,$records_count": {
      "%switch,__716,type": {
        "if add": {
          "uuid": "uuid",
          "entity_unique_id": "zigzag64",
          "username": "string",
          "xbox_user_id": "string",
          "platform_chat_id": "string",
          "build_platform": "li32",
          "skin_data": "Skin",
          "is_teacher": "bool",
          "is_host": "bool"
        },
        "if remove": {
          "uuid": "uuid"
        }
      }
    },
    "%switch,verified,type": {
      "%array,if add,bool,$records_count": null
    }
  },
  "%container,ScoreEntries,": {
    "%map,type,u8": {
      "%n,0": "change",
      "%n,1": "remove"
    },
    "%array,entries,,varint": {
      "scoreboard_id": "zigzag64",
      "objective_name": "string",
      "score": "li32",
      "%switch,__740,type": {
        "if remove": {
          "%map,entry_type,i8": {
            "%n,1": "player",
            "%n,2": "entity",
            "%n,3": "fake_player"
          },
          "%switch,entity_unique_id,entry_type": {
            "if player or entity": "zigzag64"
          },
          "%switch,custom_name,entry_type": {
            "if fake_player": "string"
          }
        }
      }
    }
  },
  "%container,ScoreboardIdentityEntries,": {
    "%map,type,i8": {
      "%n,0": "TYPE_REGISTER_IDENTITY",
      "%n,1": "TYPE_CLEAR_IDENTITY"
    },
    "%array,entries,,varint": {
      "scoreboard_id": "zigzag64",
      "%switch,entity_unique_id,type": {
        "if TYPE_REGISTER_IDENTITY": "zigzag64",
        "default": "void"
      }
    }
  },
  "%container,Enchant,": {
    "id": "u8",
    "level": "u8"
  },
  "%array,EnchantOptions,,varint": {
    "cost": "varint",
    "slot_flags": "li32",
    "%array,equip_enchants,Enchant,varint": null,
    "%array,held_enchants,Enchant,varint": null,
    "%array,self_enchants,Enchant,varint": null,
    "name": "string",
    "option_id": "zigzag32"
  },
  "%map,Action,zigzag32": {
    "%n,0": "start_break",
    "%n,1": "abort_break",
    "%n,2": "stop_break",
    "%n,3": "get_updated_block",
    "%n,4": "drop_item",
    "%n,5": "start_sleeping",
    "%n,6": "stop_sleeping",
    "%n,7": "respawn",
    "%n,8": "jump",
    "%n,9": "start_sprint",
    "%n,10": "stop_sprint",
    "%n,11": "start_sneak",
    "%n,12": "stop_sneak",
    "%n,13": "creative_player_destroy_block",
    "!comment,789": "sent when spawning in a different dimension to tell the server we spawned\n",
    "%n,14": "dimension_change_ack",
    "%n,15": "start_glide",
    "%n,16": "stop_glide",
    "%n,17": "build_denied",
    "%n,18": "crack_break",
    "%n,19": "change_skin",
    "!comment,796": "no longer used\n",
    "%n,20": "set_enchatnment_seed",
    "%n,21": "swimming",
    "%n,22": "stop_swimming",
    "%n,23": "start_spin_attack",
    "%n,24": "stop_spin_attack",
    "%n,25": "interact_block",
    "%n,26": "predict_break",
    "%n,27": "continue_break"
  },
  "!comment,806": "Source and Destination point to the source slot from which Count of the item stack were taken and the\ndestination slot to which this item was moved.\n",
  "%container,StackRequestSlotInfo,": {
    "!comment,809": "ContainerID is the ID of the container that the slot was in.\n",
    "slot_type": "ContainerSlotType",
    "!comment,811": "Slot is the index of the slot within the container with the ContainerID above. \n",
    "slot": "u8",
    "!comment,813": "StackNetworkID is the unique stack ID that the client assumes to be present in this slot. The server\nmust check if these IDs match. If they do not match, servers should reject the stack request that the\n",
    "!comment,815": "action holding this info was in.\n",
    "stack_id": "zigzag32"
  },
  "!comment,818": "ItemStackRequest is sent by the client to change item stacks in an inventory. It is essentially a\nreplacement of the InventoryTransaction packet added in 1.16 for inventory specific actions, such as moving\n",
  "!comment,820": "items around or crafting. The InventoryTransaction packet is still used for actions such as placing blocks\nand interacting with entities.\n",
  "%container,ItemStackRequest,": {
    "!comment,823": "RequestID is a unique ID for the request. This ID is used by the server to send a response for this\nspecific request in the ItemStackResponse packet.\n",
    "request_id": "varint",
    "%array,actions,,varint": {
      "%map,type_id,u8": {
        "!comment,828": "TakeStackRequestAction is sent by the client to the server to take x amount of items from one slot in a\ncontainer to the cursor.\n",
        "%n,0": "take",
        "!comment,831": "PlaceStackRequestAction is sent by the client to the server to place x amount of items from one slot into\nanother slot, such as when shift clicking an item in the inventory to move it around or when moving an item\n",
        "!comment,833": "in the cursor into a slot.\n",
        "%n,1": "place",
        "!comment,835": "SwapStackRequestAction is sent by the client to swap the item in its cursor with an item present in another\ncontainer. The two item stacks swap places. \n",
        "%n,2": "swap",
        "!comment,838": "DropStackRequestAction is sent by the client when it drops an item out of the inventory when it has its\ninventory opened. This action is not sent when a player drops an item out of the hotbar using the Q button\n",
        "!comment,840": "(or the equivalent on mobile). The InventoryTransaction packet is still used for that action, regardless of\nwhether the item stack network IDs are used or not.\n",
        "%n,3": "drop",
        "!comment,843": "DestroyStackRequestAction is sent by the client when it destroys an item in creative mode by moving it\nback into the creative inventory.\n",
        "%n,4": "destroy",
        "!comment,846": "ConsumeStackRequestAction is sent by the client when it uses an item to craft another item. The original\nitem is 'consumed'.\n",
        "%n,5": "consume",
        "!comment,849": "CreateStackRequestAction is sent by the client when an item is created through being used as part of a\nrecipe. For example, when milk is used to craft a cake, the buckets are leftover. The buckets are moved to\n",
        "!comment,851": "the slot sent by the client here.\nNote that before this is sent, an action for consuming all items in the crafting table/grid is sent. Items\n",
        "!comment,853": "that are not fully consumed when used for a recipe should not be destroyed there, but instead, should be\nturned into their respective resulting items. \n",
        "%n,6": "create",
        "!comment,856": "LabTableCombineStackRequestAction is sent by the client when it uses a lab table to combine item stacks.\n",
        "%n,7": "lab_table_combine",
        "!comment,858": "BeaconPaymentStackRequestAction is sent by the client when it submits an item to enable effects from a\nbeacon. These items will have been moved into the beacon item slot in advance. \n",
        "%n,8": "beacon_payment",
        "!comment,861": "MineBlockStackRequestAction is sent by the client when it breaks a block.\n",
        "%n,9": "mine_block",
        "!comment,863": "CraftRecipeStackRequestAction is sent by the client the moment it begins crafting an item. This is the\nfirst action sent, before the Consume and Create item stack request actions.\n",
        "!comment,865": "This action is also sent when an item is enchanted. Enchanting should be treated mostly the same way as\ncrafting, where the old item is consumed.\n",
        "%n,10": "craft_recipe",
        "!comment,868": "AutoCraftRecipeStackRequestAction is sent by the client similarly to the CraftRecipeStackRequestAction. The\nonly difference is that the recipe is automatically created and crafted by shift clicking the recipe book.\n",
        "%n,11": "craft_recipe_auto",
        "!comment,871": "CraftCreativeStackRequestAction is sent by the client when it takes an item out fo the creative inventory.\nThe item is thus not really crafted, but instantly created.\n",
        "%n,12": "craft_creative",
        "!comment,874": "CraftRecipeOptionalStackRequestAction is sent when using an anvil. When this action is sent, the\nCustomNames field in the respective stack request is non-empty and contains the name of the item created\n",
        "!comment,876": "using the anvil.\n",
        "%n,13": "optional",
        "!comment,878": "CraftNonImplementedStackRequestAction is an action sent for inventory actions that aren't yet implemented\nin the new system. These include, for example, anvils.\n",
        "%n,14": "non_implemented",
        "!comment,881": "CraftResultsDeprecatedStackRequestAction is an additional, deprecated packet sent by the client after\ncrafting. It holds the final results and the amount of times the recipe was crafted. It shouldn't be used.\n",
        "!comment,883": "This action is also sent when an item is enchanted. Enchanting should be treated mostly the same way as\ncrafting, where the old item is consumed.\n",
        "%n,15": "results_deprecated"
      },
      "%switch,__886,type_id": {
        "if take or place": {
          "count": "u8",
          "source": "StackRequestSlotInfo",
          "destination": "StackRequestSlotInfo"
        },
        "if swap": {
          "!comment,892": "Source and Destination point to the source slot from which Count of the item stack were taken and the\ndestination slot to which this item was moved.\n",
          "source": "StackRequestSlotInfo",
          "destination": "StackRequestSlotInfo"
        },
        "if drop": {
          "!comment,897": "Count is the count of the item in the source slot that was taken towards the destination slot.\n",
          "count": "u8",
          "!comment,899": "Source is the source slot from which items were dropped to the ground.\n",
          "source": "StackRequestSlotInfo",
          "!comment,901": "Randomly seems to be set to false in most cases. I'm not entirely sure what this does, but this is what\nvanilla calls this field.\n",
          "randomly": "bool"
        },
        "if destroy or consume": {
          "!comment,905": "Count is the count of the item in the source slot that was destroyed.\n",
          "count": "u8",
          "!comment,907": "Source is the source slot from which items came that were destroyed by moving them into the creative\ninventory.\n",
          "source": "StackRequestSlotInfo"
        },
        "if create": {
          "!comment,911": "ResultsSlot is the slot in the inventory in which the results of the crafting ingredients are to be\nplaced.\n",
          "result_slot_id": "u8"
        },
        "if beacon_payment": {
          "!comment,915": "PrimaryEffect and SecondaryEffect are the effects that were selected from the beacon.\n",
          "primary_effect": "zigzag32",
          "secondary_effect": "zigzag32"
        },
        "if mine_block": {
          "!comment,919": "// Unknown1 ... TODO: Find out what this is for\n",
          "unknown1": "zigzag32",
          "!comment,921": "PredictedDurability is the durability of the item that the client assumes to be present at the time\n",
          "predicted_durability": "zigzag32",
          "!comment,923": "StackNetworkID is the unique stack ID that the client assumes to be present at the time. The server\nmust check if these IDs match. If they do not match, servers should reject the stack request that the\n",
          "!comment,925": "action holding this info was in.\n",
          "network_id": "zigzag32"
        },
        "if craft_recipe or craft_recipe_auto": {
          "!comment,928": "RecipeNetworkID is the network ID of the recipe that is about to be crafted. This network ID matches\none of the recipes sent in the CraftingData packet, where each of the recipes have a RecipeNetworkID as\n",
          "!comment,930": "of 1.16.\n",
          "recipe_network_id": "varint"
        },
        "if craft_creative": {
          "!comment,933": "The stack ID of the creative item that is being created. This is one of the\ncreative item stack IDs sent in the CreativeContent packet.\n",
          "item_id": "varint32"
        },
        "if optional": {
          "!comment,937": "For the cartography table, if a certain MULTI recipe is being called, this points to the network ID that was assigned.\n",
          "recipe_network_id": "varint",
          "!comment,939": "Most likely the index in the request's filter strings that this action is using\n",
          "filtered_string_index": "li32"
        },
        "if non_implemented": "void",
        "if results_deprecated": {
          "%array,result_items,ItemLegacy,varint": null,
          "times_crafted": "u8"
        }
      }
    },
    "!comment,945": "CustomNames is a list of custom names involved in the request. This is typically filled with one string\nwhen an anvil is used.\n",
    "!comment,947": "* Used for the server to determine which strings should be filtered. Used in anvils to verify a renamed item.\n",
    "%array,custom_names,string,varint": null
  },
  "!comment,950": "ItemStackResponse is a response to an individual ItemStackRequest.\n",
  "%array,ItemStackResponses,,varint": {
    "!comment,952": "Status specifies if the request with the RequestID below was successful. If this is the case, the\nContainerInfo below will have information on what slots ended up changing. If not, the container info\n",
    "!comment,954": "will be empty.\nA non-0 status means an error occurred and will result in the action being reverted.\n",
    "%map,status,u8": {
      "%n,0": "ok",
      "%n,1": "error"
    },
    "!comment,959": "RequestID is the unique ID of the request that this response is in reaction to. If rejected, the client\nwill undo the actions from the request with this ID.\n",
    "request_id": "varint32",
    "%switch,__962,status": {
      "if ok": {
        "!comment,964": "ContainerInfo holds information on the containers that had their contents changed as a result of the\nrequest.\n",
        "%array,containers,,varint": {
          "!comment,967": "ContainerID is the container ID of the container that the slots that follow are in. For the main\ninventory, this value seems to be 0x1b. For the cursor, this value seems to be 0x3a. For the crafting\n",
          "!comment,969": "grid, this value seems to be 0x0d.\n* actually, this is ContainerSlotType - used by the inventory system that specifies the type of slot\n",
          "slot_type": "ContainerSlotType",
          "!comment,972": "SlotInfo holds information on what item stack should be present in specific slots in the container.\n",
          "%array,slots,,varint": {
            "!comment,974": "Slot and HotbarSlot seem to be the same value every time: The slot that was actually changed. I'm not\nsure if these slots ever differ.\n",
            "slot": "u8",
            "hotbar_slot": "u8",
            "!comment,978": "Count is the total count of the item stack. This count will be shown client-side after the response is\nsent to the client.\n",
            "count": "u8",
            "!comment,981": "StackNetworkID is the network ID of the new stack at a specific slot.\n",
            "item_stack_id": "varint32",
            "!comment,983": "CustomName is the custom name of the item stack. It is used in relation to text filtering.\n",
            "custom_name": "string",
            "!comment,985": "DurabilityCorrection is the current durability of the item stack. This durability will be shown\nclient-side after the response is sent to the client.\n",
            "durability_correction": "zigzag32"
          }
        }
      }
    }
  },
  "%array,ItemComponentList,,varint": {
    "!comment,991": "Name is the name of the item, which is a name like 'minecraft:stick'.\n",
    "name": "string",
    "!comment,993": "Data is a map containing the components and properties of the item.\n",
    "nbt": "nbt"
  },
  "%container,CommandOrigin,": {
    "!comment,997": "Origin is one of the values above that specifies the origin of the command. The origin may change,\ndepending on what part of the client actually called the command. The command may be issued by a\n",
    "!comment,999": "websocket server, for example.\n",
    "%map,type,varint": {
      "%n,0": "player",
      "%n,1": "block",
      "%n,2": "minecart_block",
      "%n,3": "dev_console",
      "%n,4": "test",
      "%n,5": "automation_player",
      "%n,6": "client_automation",
      "%n,7": "dedicated_server",
      "%n,8": "entity",
      "%n,9": "virtual",
      "%n,10": "game_argument",
      "%n,11": "entity_server",
      "%n,12": "precompiled",
      "%n,13": "game_director_entity_server",
      "%n,14": "script"
    },
    "!comment,1017": "UUID is the UUID of the command called. This UUID is a bit odd as it is not specified by the server. It\nis not clear what exactly this UUID is meant to identify, but it is unique for each command called.\n",
    "uuid": "uuid",
    "!comment,1020": "RequestID is an ID that identifies the request of the client. The server should send a CommandOrigin\nwith the same request ID to ensure it can be matched with the request by the caller of the command.\n",
    "!comment,1022": "This is especially important for websocket servers and it seems that this field is only non-empty for\nthese websocket servers.\n",
    "request_id": "string",
    "!comment,1025": "PlayerUniqueID is an ID that identifies the player, the same as the one found in the AdventureSettings\npacket. Filling it out with 0 seems to work.\n",
    "!comment,1027": "PlayerUniqueID is only written if Origin is CommandOriginDevConsole or CommandOriginTest.\n",
    "%switch,player_entity_id,type": {
      "if dev_console or test": {
        "player_entity_id": "zigzag64"
      }
    }
  },
  "!comment,1032": "MapTrackedObject is an object on a map that is 'tracked' by the client, such as an entity or a block. This\nobject may move, which is handled client-side.\n",
  "%container,TrackedObject,": {
    "!comment,1035": "Type is the type of the tracked object. It is either MapObjectTypeEntity or MapObjectTypeBlock.\n",
    "%map,type,li32": {
      "%n,0": "entity",
      "%n,1": "block"
    },
    "!comment,1039": "EntityUniqueID is the unique ID of the entity, if the tracked object was an entity. It needs not to be\nfilled out if Type is not MapObjectTypeEntity.\n",
    "%switch,entity_unique_id,type": {
      "if entity": "zigzag64"
    },
    "!comment,1043": "BlockPosition is the position of the block, if the tracked object was a block. It needs not to be\nfilled out if Type is not MapObjectTypeBlock.\n",
    "%switch,block_position,type": {
      "if block": "BlockCoordinates"
    }
  },
  "!comment,1048": "MapDecoration is a fixed decoration on a map: Its position or other properties do not change automatically\nclient-side.\n",
  "%container,MapDecoration,": {
    "type": "u8",
    "!comment,1052": "Rotation is the rotation of the map decoration. It is byte due to the 16 fixed directions that the\nmap decoration may face.\n",
    "rotation": "u8",
    "!comment,1055": "X is the offset on the X axis in pixels of the decoration.\n",
    "x": "u8",
    "!comment,1057": "Y is the offset on the Y axis in pixels of the decoration.\n",
    "y": "u8",
    "!comment,1059": "Label is the name of the map decoration. This name may be of any value.\n",
    "label": "string",
    "!comment,1061": "Colour is the colour of the map decoration. Some map decoration types have a specific colour set\nautomatically, whereas others may be changed.\n",
    "color_abgr": "varint"
  },
  "!comment,1065": "Some arbitrary definitions from CBMC, Window IDs are normally\nunique + sequential\n",
  "%map,WindowID,i8": {
    "%n,-100": "drop_contents",
    "%n,-24": "beacon",
    "%n,-23": "trading_output",
    "%n,-22": "trading_use_inputs",
    "%n,-21": "trading_input_2",
    "%n,-20": "trading_input_1",
    "%n,-17": "enchant_output",
    "%n,-16": "enchant_material",
    "%n,-15": "enchant_input",
    "%n,-13": "anvil_output",
    "%n,-12": "anvil_result",
    "%n,-11": "anvil_material",
    "%n,-10": "container_input",
    "%n,-5": "crafting_use_ingredient",
    "%n,-4": "crafting_result",
    "%n,-3": "crafting_remove_ingredient",
    "%n,-2": "crafting_add_ingredient",
    "%n,-1": "none",
    "%n,0": "inventory",
    "%n,1": "first",
    "%n,100": "last",
    "%n,119": "offhand",
    "%n,120": "armor",
    "%n,121": "creative",
    "%n,122": "hotbar",
    "%n,123": "fixed_inventory",
    "%n,124": "ui"
  },
  "%map,WindowIDVarint,varint": {
    "%n,-100": "drop_contents",
    "%n,-24": "beacon",
    "%n,-23": "trading_output",
    "%n,-22": "trading_use_inputs",
    "%n,-21": "trading_input_2",
    "%n,-20": "trading_input_1",
    "%n,-17": "enchant_output",
    "%n,-16": "enchant_material",
    "%n,-15": "enchant_input",
    "%n,-13": "anvil_output",
    "%n,-12": "anvil_result",
    "%n,-11": "anvil_material",
    "%n,-10": "container_input",
    "%n,-5": "crafting_use_ingredient",
    "%n,-4": "crafting_result",
    "%n,-3": "crafting_remove_ingredient",
    "%n,-2": "crafting_add_ingredient",
    "%n,-1": "none",
    "%n,0": "inventory",
    "%n,1": "first",
    "%n,100": "last",
    "%n,119": "offhand",
    "%n,120": "armor",
    "%n,121": "creative",
    "%n,122": "hotbar",
    "%n,123": "fixed_inventory",
    "%n,124": "ui"
  },
  "%map,WindowType,i8": {
    "%n,-9": "none",
    "%n,-1": "inventory",
    "%n,0": "container",
    "%n,1": "workbench",
    "%n,2": "furnace",
    "%n,3": "enchantment",
    "%n,4": "brewing_stand",
    "%n,5": "anvil",
    "%n,6": "dispenser",
    "%n,7": "dropper",
    "%n,8": "hopper",
    "%n,9": "cauldron",
    "%n,10": "minecart_chest",
    "%n,11": "minecart_hopper",
    "%n,12": "horse",
    "%n,13": "beacon",
    "%n,14": "structure_editor",
    "%n,15": "trading",
    "%n,16": "command_block",
    "%n,17": "jukebox",
    "%n,18": "armor",
    "%n,19": "hand",
    "%n,20": "compound_creator",
    "%n,21": "element_constructor",
    "%n,22": "material_reducer",
    "%n,23": "lab_table",
    "%n,24": "loom",
    "%n,25": "lectern",
    "%n,26": "grindstone",
    "%n,27": "blast_furnace",
    "%n,28": "smoker",
    "%n,29": "stonecutter",
    "%n,30": "cartography",
    "%n,31": "hud",
    "%n,32": "jigsaw_editor",
    "%n,33": "smithing_table"
  },
  "!comment,1163": "Used in inventory transactions. \n",
  "%map,ContainerSlotType,u8": [
    "anvil_input",
    "anvil_material",
    "anvil_result",
    "smithing_table_input",
    "smithing_table_material",
    "smithing_table_result",
    "armor",
    "container",
    "beacon_payment",
    "brewing_input",
    "brewing_result",
    "brewing_fuel",
    "hotbar_and_inventory",
    "crafting_input",
    "crafting_output",
    "recipe_construction",
    "recipe_nature",
    "recipe_items",
    "recipe_search",
    "recipe_search_bar",
    "recipe_equipment",
    "enchanting_input",
    "enchanting_lapis",
    "furnace_fuel",
    "furnace_ingredient",
    "furnace_output",
    "horse_equip",
    "hotbar",
    "inventory",
    "shulker",
    "trade_ingredient1",
    "trade_ingredient2",
    "trade_result",
    "offhand",
    "compcreate_input",
    "compcreate_output",
    "elemconstruct_output",
    "matreduce_input",
    "matreduce_output",
    "labtable_input",
    "loom_input",
    "loom_dye",
    "loom_material",
    "loom_result",
    "blast_furnace_ingredient",
    "smoker_ingredient",
    "trade2_ingredient1",
    "trade2_ingredient2",
    "trade2_result",
    "grindstone_input",
    "grindstone_additional",
    "grindstone_result",
    "stonecutter_input",
    "stonecutter_result",
    "cartography_input",
    "cartography_additional",
    "cartography_result",
    "barrel",
    "cursor",
    "creative_output"
  ],
  "%map,SoundType,varint": [
    "ItemUseOn",
    "Hit",
    "Step",
    "Fly",
    "Jump",
    "Break",
    "Place",
    "HeavyStep",
    "Gallop",
    "Fall",
    "Ambient",
    "AmbientBaby",
    "AmbientInWater",
    "Breathe",
    "Death",
    "DeathInWater",
    "DeathToZombie",
    "Hurt",
    "HurtInWater",
    "Mad",
    "Boost",
    "Bow",
    "SquishBig",
    "SquishSmall",
    "FallBig",
    "FallSmall",
    "Splash",
    "Fizz",
    "Flap",
    "Swim",
    "Drink",
    "Eat",
    "Takeoff",
    "Shake",
    "Plop",
    "Land",
    "Saddle",
    "Armor",
    "MobArmorStandPlace",
    "AddChest",
    "Throw",
    "Attack",
    "AttackNoDamage",
    "AttackStrong",
    "Warn",
    "Shear",
    "Milk",
    "Thunder",
    "Explode",
    "Fire",
    "Ignite",
    "Fuse",
    "Stare",
    "Spawn",
    "Shoot",
    "BreakBlock",
    "Launch",
    "Blast",
    "LargeBlast",
    "Twinkle",
    "Remedy",
    "Infect",
    "LevelUp",
    "BowHit",
    "BulletHit",
    "ExtinguishFire",
    "ItemFizz",
    "ChestOpen",
    "ChestClosed",
    "ShulkerBoxOpen",
    "ShulkerBoxClosed",
    "EnderChestOpen",
    "EnderChestClosed",
    "PowerOn",
    "PowerOff",
    "Attach",
    "Detach",
    "Deny",
    "Tripod",
    "Pop",
    "DropSlot",
    "Note",
    "Thorns",
    "PistonIn",
    "PistonOut",
    "Portal",
    "Water",
    "LavaPop",
    "Lava",
    "Burp",
    "BucketFillWater",
    "BucketFillLava",
    "BucketEmptyWater",
    "BucketEmptyLava",
    "ArmorEquipChain",
    "ArmorEquipDiamond",
    "ArmorEquipGeneric",
    "ArmorEquipGold",
    "ArmorEquipIron",
    "ArmorEquipLeather",
    "ArmorEquipElytra",
    "Record13",
    "RecordCat",
    "RecordBlocks",
    "RecordChirp",
    "RecordFar",
    "RecordMall",
    "RecordMellohi",
    "RecordStal",
    "RecordStrad",
    "RecordWard",
    "Record11",
    "RecordWait",
    "unknown1",
    "Flop",
    "ElderGuardianCurse",
    "MobWarning",
    "MobWarningBaby",
    "Teleport",
    "ShulkerOpen",
    "ShulkerClose",
    "Haggle",
    "HaggleYes",
    "HaggleNo",
    "HaggleIdle",
    "ChorusGrow",
    "ChorusDeath",
    "Glass",
    "PotionBrewed",
    "CastSpell",
    "PrepareAttack",
    "PrepareSummon",
    "PrepareWololo",
    "Fang",
    "Charge",
    "CameraTakePicture",
    "LeashKnotPlace",
    "LeashKnotBreak",
    "Growl",
    "Whine",
    "Pant",
    "Purr",
    "Purreow",
    "DeathMinVolume",
    "DeathMidVolume",
    "unknown2",
    "ImitateCaveSpider",
    "ImitateCreeper",
    "ImitateElderGuardian",
    "ImitateEnderDragon",
    "ImitateEnderman",
    "unknown3",
    "ImitateEvocationIllager",
    "ImitateGhast",
    "ImitateHusk",
    "ImitateIllusionIllager",
    "ImitateMagmaCube",
    "ImitatePolarBear",
    "ImitateShulker",
    "ImitateSilverfish",
    "ImitateSkeleton",
    "ImitateSlime",
    "ImitateSpider",
    "ImitateStray",
    "ImitateVex",
    "ImitateVindicationIllager",
    "ImitateWitch",
    "ImitateWither",
    "ImitateWitherSkeleton",
    "ImitateWolf",
    "ImitateZombie",
    "ImitateZombiePigman",
    "ImitateZombieVillager",
    "BlockEndPortalFrameFill",
    "BlockEndPortalSpawn",
    "RandomAnvilUse",
    "BottleDragonBreath",
    "PortalTravel",
    "ItemTridentHit",
    "ItemTridentReturn",
    "ItemTridentRiptide1",
    "ItemTridentRiptide2",
    "ItemTridentRiptide3",
    "ItemTridentThrow",
    "ItemTridentThunder",
    "ItemTridentHitGround",
    "Default",
    "BlockFletchingTableUse",
    "ElemConstructOpen",
    "IceBombHit",
    "BalloonPop",
    "LtReactionIceBomb",
    "LtReactionBleach",
    "LtReactionEPaste",
    "LtReactionEPaste2",
    "LtReactionFertilizer",
    "LtReactionFireball",
    "LtReactionMgsalt",
    "LtReactionMiscfire",
    "LtReactionFire",
    "LtReactionMiscexplosion",
    "LtReactionMiscmystical",
    "LtReactionMiscmystical2",
    "LtReactionProduct",
    "SparklerUse",
    "GlowstickUse",
    "SparklerActive",
    "ConvertToDrowned",
    "BucketFillFish",
    "BucketEmptyFish",
    "BubbleUp",
    "BubbleDown",
    "BubblePop",
    "BubbleUpInside",
    "BubbleDownInside",
    "HurtBaby",
    "DeathBaby",
    "StepBaby",
    "BabySpawn",
    "Born",
    "BlockTurtleEggBreak",
    "BlockTurtleEggCrack",
    "BlockTurtleEggHatch",
    "TurtleLayEgg",
    "BlockTurtleEggAttack",
    "BeaconActivate",
    "BeaconAmbient",
    "BeaconDeactivate",
    "BeaconPower",
    "ConduitActivate",
    "ConduitAmbient",
    "ConduitAttack",
    "ConduitDeactivate",
    "ConduitShort",
    "Swoop",
    "BlockBambooSaplingPlace",
    "PreSneeze",
    "Sneeze",
    "AmbientTame",
    "Scared",
    "BlockScaffoldingClimb",
    "CrossbowLoadingStart",
    "CrossbowLoadingMiddle",
    "CrossbowLoadingEnd",
    "CrossbowShoot",
    "CrossbowQuickChargeStart",
    "CrossbowQuickChargeMiddle",
    "CrossbowQuickChargeEnd",
    "AmbientAggressive",
    "AmbientWorried",
    "CantBreed",
    "ItemShieldBlock",
    "ItemBookPut",
    "BlockGrindstoneUse",
    "BlockBellHit",
    "BlockCampfireCrackle",
    "Roar",
    "Stun",
    "BlockSweetBerryBushHurt",
    "BlockSweetBerryBushPick",
    "UICartographyTableTakeResult",
    "UIStoneCutterTakeResult",
    "BlockComposterEmpty",
    "BlockComposterFill",
    "BlockComposterFillSuccess",
    "BlockComposterReady",
    "BlockBarrelOpen",
    "BlockBarrelClose",
    "RaidHorn",
    "BlockLoomUse",
    "AmbientRaid",
    "UICartographyTableUse",
    "UIStoneCutterUse",
    "UILoomUse",
    "SmokerUse",
    "BlastFurnaceUse",
    "SmithingTableUse",
    "Screech",
    "Sleep",
    "FurnaceUse",
    "MooshroomConvert",
    "MilkSuspiciously",
    "Celebrate",
    "JumpPrevent",
    "AmbientPollinate",
    "BeeHiveDrip",
    "BeeHiveEnter",
    "BeeHiveExit",
    "BeeHiveWork",
    "BeeHiveShear",
    "HoneyBottleDrink",
    "AmbientCave",
    "Retreat",
    "ConvertToZombified",
    "Admire",
    "StepLava",
    "Tempt",
    "Panic",
    "Angry",
    "AmbientWarpedForest",
    "AmbientSoulsandValley",
    "AmbientNetherWastes",
    "AmbientBasaltDeltas",
    "AmbientCrimsonForest",
    "RespawnAnchorCharge",
    "RespawnAnchorDeplete",
    "RespawnAnchorSetSpawn",
    "RespawnAnchorAmbient",
    "SoulEscapeQuiet",
    "SoulEscapeLoud",
    "RecordPigstep",
    "LinkCompassToLodestone",
    "BlockSmithingTableUse",
    "EquipNetherite",
    "AmbientLoopWarpedForest",
    "AmbientLoopSoulsandValley",
    "AmbientLoopNetherWastes",
    "AmbientLoopBasaltDeltas",
    "AmbientLoopCrimsonForest",
    "AmbientAdditionWarpedForest",
    "AmbientAdditionSoulsandValley",
    "AmbientAdditionNetherWastes",
    "AmbientAdditionBasaltDeltas",
    "AmbientAdditionCrimsonForest",
    "SculkSensorPowerOn",
    "SculkSensorPowerOff",
    "BucketFillPowderSnow",
    "BucketEmptyPowderSnow",
    "PointedDripstoneCauldronDripWater",
    "PointedDripstoneCauldronDripLava",
    "PointedDripstoneDripWater",
    "PointedDripstoneDripLava",
    "CaveVinesPickBerries",
    "BigDripleafTiltDown",
    "BigDripleafTiltUp",
    "Undefined"
  ],
  "!comment,1564": "TODO: remove?\n",
  "%map,LegacyEntityType,li32": {
    "%n,10": "chicken",
    "%n,11": "cow",
    "%n,12": "pig",
    "%n,13": "sheep",
    "%n,14": "wolf",
    "%n,15": "villager",
    "%n,16": "mooshroom",
    "%n,17": "squid",
    "%n,18": "rabbit",
    "%n,19": "bat",
    "%n,20": "iron_golem",
    "%n,21": "snow_golem",
    "%n,22": "ocelot",
    "%n,23": "horse",
    "%n,24": "donkey",
    "%n,25": "mule",
    "%n,26": "skeleton_horse",
    "%n,27": "zombie_horse",
    "%n,28": "polar_bear",
    "%n,29": "llama",
    "%n,30": "parrot",
    "%n,31": "dolphin",
    "%n,32": "zombie",
    "%n,33": "creeper",
    "%n,34": "skeleton",
    "%n,35": "spider",
    "%n,36": "zombie_pigman",
    "%n,37": "slime",
    "%n,38": "enderman",
    "%n,39": "silverfish",
    "%n,40": "cave_spider",
    "%n,41": "ghast",
    "%n,42": "magma_cube",
    "%n,43": "blaze",
    "%n,44": "zombie_villager",
    "%n,45": "witch",
    "%n,46": "stray",
    "%n,47": "husk",
    "%n,48": "wither_skeleton",
    "%n,49": "guardian",
    "%n,50": "elder_guardian",
    "%n,51": "npc",
    "%n,52": "wither",
    "%n,53": "ender_dragon",
    "%n,54": "shulker",
    "%n,55": "endermite",
    "%n,56": "agent",
    "%n,57": "vindicator",
    "%n,58": "phantom",
    "%n,61": "armor_stand",
    "%n,62": "tripod_camera",
    "%n,63": "player",
    "%n,64": "item",
    "%n,65": "tnt",
    "%n,66": "falling_block",
    "%n,67": "moving_block",
    "%n,68": "xp_bottle",
    "%n,69": "xp_orb",
    "%n,70": "eye_of_ender_signal",
    "%n,71": "ender_crystal",
    "%n,72": "fireworks_rocket",
    "%n,73": "thrown_trident",
    "%n,74": "turtle",
    "%n,75": "cat",
    "%n,76": "shulker_bullet",
    "%n,77": "fishing_hook",
    "%n,78": "chalkboard",
    "%n,79": "dragon_fireball",
    "%n,80": "arrow",
    "%n,81": "snowball",
    "%n,82": "egg",
    "%n,83": "painting",
    "%n,84": "minecart",
    "%n,85": "fireball",
    "%n,86": "splash_potion",
    "%n,87": "ender_pearl",
    "%n,88": "leash_knot",
    "%n,89": "wither_skull",
    "%n,90": "boat",
    "%n,91": "wither_skull_dangerous",
    "%n,93": "lightning_bolt",
    "%n,94": "small_fireball",
    "%n,95": "area_effect_cloud",
    "%n,96": "hopper_minecart",
    "%n,97": "tnt_minecart",
    "%n,98": "chest_minecart",
    "%n,100": "command_block_minecart",
    "%n,101": "lingering_potion",
    "%n,102": "llama_spit",
    "%n,103": "evocation_fang",
    "%n,104": "evocation_illager",
    "%n,105": "vex",
    "%n,106": "ice_bomb",
    "%n,107": "balloon",
    "%n,108": "pufferfish",
    "%n,109": "salmon",
    "%n,110": "drowned",
    "%n,111": "tropicalfish",
    "%n,112": "cod",
    "%n,113": "panda"
  },
  "!import,1666": "types.yaml",
  "%container,mcpe_packet,": {
    "%map,name,varint": {
      "%n,1": "login",
      "%n,2": "play_status",
      "%n,3": "server_to_client_handshake",
      "%n,4": "client_to_server_handshake",
      "%n,5": "disconnect",
      "%n,6": "resource_packs_info",
      "%n,7": "resource_pack_stack",
      "%n,8": "resource_pack_client_response",
      "%n,9": "text",
      "%n,10": "set_time",
      "%n,11": "start_game",
      "%n,12": "add_player",
      "%n,13": "add_entity",
      "%n,14": "remove_entity",
      "%n,15": "add_item_entity",
      "%n,17": "take_item_entity",
      "%n,18": "move_entity",
      "%n,19": "move_player",
      "%n,20": "rider_jump",
      "%n,21": "update_block",
      "%n,22": "add_painting",
      "%n,23": "tick_sync",
      "%n,24": "level_sound_event_old",
      "%n,25": "level_event",
      "%n,26": "block_event",
      "%n,27": "entity_event",
      "%n,28": "mob_effect",
      "%n,29": "update_attributes",
      "%n,30": "inventory_transaction",
      "%n,31": "mob_equipment",
      "%n,32": "mob_armor_equipment",
      "%n,33": "interact",
      "%n,34": "block_pick_request",
      "%n,35": "entity_pick_request",
      "%n,36": "player_action",
      "%n,38": "hurt_armor",
      "%n,39": "set_entity_data",
      "%n,40": "set_entity_motion",
      "%n,41": "set_entity_link",
      "%n,42": "set_health",
      "%n,43": "set_spawn_position",
      "%n,44": "animate",
      "%n,45": "respawn",
      "%n,46": "container_open",
      "%n,47": "container_close",
      "%n,48": "player_hotbar",
      "%n,49": "inventory_content",
      "%n,50": "inventory_slot",
      "%n,51": "container_set_data",
      "%n,52": "crafting_data",
      "%n,53": "crafting_event",
      "%n,54": "gui_data_pick_item",
      "%n,55": "adventure_settings",
      "%n,56": "block_entity_data",
      "%n,57": "player_input",
      "%n,58": "level_chunk",
      "%n,59": "set_commands_enabled",
      "%n,60": "set_difficulty",
      "%n,61": "change_dimension",
      "%n,62": "set_player_game_type",
      "%n,63": "player_list",
      "%n,64": "simple_event",
      "%n,65": "event",
      "%n,66": "spawn_experience_orb",
      "%n,67": "clientbound_map_item_data",
      "%n,68": "map_info_request",
      "%n,69": "request_chunk_radius",
      "%n,70": "chunk_radius_update",
      "%n,71": "item_frame_drop_item",
      "%n,72": "game_rules_changed",
      "%n,73": "camera",
      "%n,74": "boss_event",
      "%n,75": "show_credits",
      "%n,76": "available_commands",
      "%n,77": "command_request",
      "%n,78": "command_block_update",
      "%n,79": "command_output",
      "%n,80": "update_trade",
      "%n,81": "update_equipment",
      "%n,82": "resource_pack_data_info",
      "%n,83": "resource_pack_chunk_data",
      "%n,84": "resource_pack_chunk_request",
      "%n,85": "transfer",
      "%n,86": "play_sound",
      "%n,87": "stop_sound",
      "%n,88": "set_title",
      "%n,89": "add_behavior_tree",
      "%n,90": "structure_block_update",
      "%n,91": "show_store_offer",
      "%n,92": "purchase_receipt",
      "%n,93": "player_skin",
      "%n,94": "sub_client_login",
      "%n,95": "initiate_web_socket_connection",
      "%n,96": "set_last_hurt_by",
      "%n,97": "book_edit",
      "%n,98": "npc_request",
      "%n,99": "photo_transfer",
      "%n,100": "modal_form_request",
      "%n,101": "modal_form_response",
      "%n,102": "server_settings_request",
      "%n,103": "server_settings_response",
      "%n,104": "show_profile",
      "%n,105": "set_default_game_type",
      "%n,106": "remove_objective",
      "%n,107": "set_display_objective",
      "%n,108": "set_score",
      "%n,109": "lab_table",
      "%n,110": "update_block_synced",
      "%n,111": "move_entity_delta",
      "%n,112": "set_scoreboard_identity",
      "%n,113": "set_local_player_as_initialized",
      "%n,114": "update_soft_enum",
      "%n,115": "network_stack_latency",
      "%n,117": "script_custom_event",
      "%n,118": "spawn_particle_effect",
      "%n,119": "available_entity_identifiers",
      "%n,120": "level_sound_event_v2",
      "%n,121": "network_chunk_publisher_update",
      "%n,122": "biome_definition_list",
      "%n,123": "level_sound_event",
      "%n,124": "level_event_generic",
      "%n,125": "lectern_update",
      "%n,126": "video_stream_connect",
      "%n,127": "add_ecs_entity",
      "%n,128": "remove_ecs_entity",
      "%n,129": "client_cache_status",
      "%n,130": "on_screen_texture_animation",
      "%n,131": "map_create_locked_copy",
      "%n,132": "structure_template_data_export_request",
      "%n,133": "structure_template_data_export_response",
      "%n,134": "update_block_properties",
      "%n,135": "client_cache_blob_status",
      "%n,136": "client_cache_miss_response",
      "%n,137": "education_settings",
      "%n,139": "multiplayer_settings",
      "%n,140": "settings_command",
      "%n,141": "anvil_damage",
      "%n,142": "completed_using_item",
      "%n,143": "network_settings",
      "%n,144": "player_auth_input",
      "%n,145": "creative_content",
      "%n,146": "player_enchant_options",
      "%n,147": "item_stack_request",
      "%n,148": "item_stack_response",
      "%n,149": "player_armor_damage",
      "%n,151": "update_player_game_type",
      "%n,154": "position_tracking_db_request",
      "%n,153": "position_tracking_db_broadcast",
      "%n,156": "packet_violation_warning",
      "%n,157": "motion_prediction_hints",
      "%n,158": "animate_entity",
      "%n,159": "camera_shake",
      "%n,160": "player_fog",
      "%n,161": "correct_player_move_prediction",
      "%n,162": "item_component",
      "%n,163": "filter_text_packet",
      "%n,164": "debug_renderer"
    },
    "%switch,params,name": {
      "if login": "packet_login",
      "if play_status": "packet_play_status",
      "if server_to_client_handshake": "packet_server_to_client_handshake",
      "if client_to_server_handshake": "packet_client_to_server_handshake",
      "if disconnect": "packet_disconnect",
      "if resource_packs_info": "packet_resource_packs_info",
      "if resource_pack_stack": "packet_resource_pack_stack",
      "if resource_pack_client_response": "packet_resource_pack_client_response",
      "if text": "packet_text",
      "if set_time": "packet_set_time",
      "if start_game": "packet_start_game",
      "if add_player": "packet_add_player",
      "if add_entity": "packet_add_entity",
      "if remove_entity": "packet_remove_entity",
      "if add_item_entity": "packet_add_item_entity",
      "if take_item_entity": "packet_take_item_entity",
      "if move_entity": "packet_move_entity",
      "if move_player": "packet_move_player",
      "if rider_jump": "packet_rider_jump",
      "if update_block": "packet_update_block",
      "if add_painting": "packet_add_painting",
      "if tick_sync": "packet_tick_sync",
      "if level_sound_event_old": "packet_level_sound_event_old",
      "if level_event": "packet_level_event",
      "if block_event": "packet_block_event",
      "if entity_event": "packet_entity_event",
      "if mob_effect": "packet_mob_effect",
      "if update_attributes": "packet_update_attributes",
      "if inventory_transaction": "packet_inventory_transaction",
      "if mob_equipment": "packet_mob_equipment",
      "if mob_armor_equipment": "packet_mob_armor_equipment",
      "if interact": "packet_interact",
      "if block_pick_request": "packet_block_pick_request",
      "if entity_pick_request": "packet_entity_pick_request",
      "if player_action": "packet_player_action",
      "if hurt_armor": "packet_hurt_armor",
      "if set_entity_data": "packet_set_entity_data",
      "if set_entity_motion": "packet_set_entity_motion",
      "if set_entity_link": "packet_set_entity_link",
      "if set_health": "packet_set_health",
      "if set_spawn_position": "packet_set_spawn_position",
      "if animate": "packet_animate",
      "if respawn": "packet_respawn",
      "if container_open": "packet_container_open",
      "if container_close": "packet_container_close",
      "if player_hotbar": "packet_player_hotbar",
      "if inventory_content": "packet_inventory_content",
      "if inventory_slot": "packet_inventory_slot",
      "if container_set_data": "packet_container_set_data",
      "if crafting_data": "packet_crafting_data",
      "if crafting_event": "packet_crafting_event",
      "if gui_data_pick_item": "packet_gui_data_pick_item",
      "if adventure_settings": "packet_adventure_settings",
      "if block_entity_data": "packet_block_entity_data",
      "if player_input": "packet_player_input",
      "if level_chunk": "packet_level_chunk",
      "if set_commands_enabled": "packet_set_commands_enabled",
      "if set_difficulty": "packet_set_difficulty",
      "if change_dimension": "packet_change_dimension",
      "if set_player_game_type": "packet_set_player_game_type",
      "if player_list": "packet_player_list",
      "if simple_event": "packet_simple_event",
      "if event": "packet_event",
      "if spawn_experience_orb": "packet_spawn_experience_orb",
      "if clientbound_map_item_data": "packet_clientbound_map_item_data",
      "if map_info_request": "packet_map_info_request",
      "if request_chunk_radius": "packet_request_chunk_radius",
      "if chunk_radius_update": "packet_chunk_radius_update",
      "if item_frame_drop_item": "packet_item_frame_drop_item",
      "if game_rules_changed": "packet_game_rules_changed",
      "if camera": "packet_camera",
      "if boss_event": "packet_boss_event",
      "if show_credits": "packet_show_credits",
      "if available_commands": "packet_available_commands",
      "if command_request": "packet_command_request",
      "if command_block_update": "packet_command_block_update",
      "if command_output": "packet_command_output",
      "if update_trade": "packet_update_trade",
      "if update_equipment": "packet_update_equipment",
      "if resource_pack_data_info": "packet_resource_pack_data_info",
      "if resource_pack_chunk_data": "packet_resource_pack_chunk_data",
      "if resource_pack_chunk_request": "packet_resource_pack_chunk_request",
      "if transfer": "packet_transfer",
      "if play_sound": "packet_play_sound",
      "if stop_sound": "packet_stop_sound",
      "if set_title": "packet_set_title",
      "if add_behavior_tree": "packet_add_behavior_tree",
      "if structure_block_update": "packet_structure_block_update",
      "if show_store_offer": "packet_show_store_offer",
      "if purchase_receipt": "packet_purchase_receipt",
      "if player_skin": "packet_player_skin",
      "if sub_client_login": "packet_sub_client_login",
      "if initiate_web_socket_connection": "packet_initiate_web_socket_connection",
      "if set_last_hurt_by": "packet_set_last_hurt_by",
      "if book_edit": "packet_book_edit",
      "if npc_request": "packet_npc_request",
      "if photo_transfer": "packet_photo_transfer",
      "if modal_form_request": "packet_modal_form_request",
      "if modal_form_response": "packet_modal_form_response",
      "if server_settings_request": "packet_server_settings_request",
      "if server_settings_response": "packet_server_settings_response",
      "if show_profile": "packet_show_profile",
      "if set_default_game_type": "packet_set_default_game_type",
      "if remove_objective": "packet_remove_objective",
      "if set_display_objective": "packet_set_display_objective",
      "if set_score": "packet_set_score",
      "if lab_table": "packet_lab_table",
      "if update_block_synced": "packet_update_block_synced",
      "if move_entity_delta": "packet_move_entity_delta",
      "if set_scoreboard_identity": "packet_set_scoreboard_identity",
      "if set_local_player_as_initialized": "packet_set_local_player_as_initialized",
      "if update_soft_enum": "packet_update_soft_enum",
      "if network_stack_latency": "packet_network_stack_latency",
      "if script_custom_event": "packet_script_custom_event",
      "if spawn_particle_effect": "packet_spawn_particle_effect",
      "if available_entity_identifiers": "packet_available_entity_identifiers",
      "if level_sound_event_v2": "packet_level_sound_event_v2",
      "if network_chunk_publisher_update": "packet_network_chunk_publisher_update",
      "if biome_definition_list": "packet_biome_definition_list",
      "if level_sound_event": "packet_level_sound_event",
      "if level_event_generic": "packet_level_event_generic",
      "if lectern_update": "packet_lectern_update",
      "if video_stream_connect": "packet_video_stream_connect",
      "if add_ecs_entity": "packet_add_ecs_entity",
      "if remove_ecs_entity": "packet_remove_ecs_entity",
      "if client_cache_status": "packet_client_cache_status",
      "if on_screen_texture_animation": "packet_on_screen_texture_animation",
      "if map_create_locked_copy": "packet_map_create_locked_copy",
      "if structure_template_data_export_request": "packet_structure_template_data_export_request",
      "if structure_template_data_export_response": "packet_structure_template_data_export_response",
      "if update_block_properties": "packet_update_block_properties",
      "if client_cache_blob_status": "packet_client_cache_blob_status",
      "if client_cache_miss_response": "packet_client_cache_miss_response",
      "if education_settings": "packet_education_settings",
      "if multiplayer_settings": "packet_multiplayer_settings",
      "if settings_command": "packet_settings_command",
      "if anvil_damage": "packet_anvil_damage",
      "if completed_using_item": "packet_completed_using_item",
      "if network_settings": "packet_network_settings",
      "if player_auth_input": "packet_player_auth_input",
      "if creative_content": "packet_creative_content",
      "if player_enchant_options": "packet_player_enchant_options",
      "if item_stack_request": "packet_item_stack_request",
      "if item_stack_response": "packet_item_stack_response",
      "if player_armor_damage": "packet_player_armor_damage",
      "if update_player_game_type": "packet_update_player_game_type",
      "if position_tracking_db_request": "packet_position_tracking_db_request",
      "if position_tracking_db_broadcast": "packet_position_tracking_db_broadcast",
      "if packet_violation_warning": "packet_packet_violation_warning",
      "if motion_prediction_hints": "packet_motion_prediction_hints",
      "if animate_entity": "packet_animate_entity",
      "if camera_shake": "packet_camera_shake",
      "if player_fog": "packet_player_fog",
      "if correct_player_move_prediction": "packet_correct_player_move_prediction",
      "if item_component": "packet_item_component",
      "if filter_text_packet": "packet_filter_text_packet",
      "if debug_renderer": "packet_debug_renderer"
    }
  },
  "!import,1986": "packet_map.yml",
  "!StartDocs,1988": "Packets",
  "!comment,1990": "# Login Sequence\nThe login process is as follows:\n",
  "!comment,1992": "\n* C→S: [Login](#packet_login)\n",
  "!comment,1994": "* S→C: [Server To Client Handshake](#packet_server_to_client_handshake)\n* C→S: [Client To Server Handshake](#packet_client_to_server_handshake)\n",
  "!comment,1996": "* S→C: [Play Status (Login success)](#packet_play_status)\n* To spawn, the following packets should be sent, in order, after the ones above:\n",
  "!comment,1998": "* S→C: [Resource Packs Info](#packet_resource_packs_info)\n* C→S: [Resource Pack Client Response](#packet_resource_pack_client_response)\n",
  "!comment,2000": "* S→C: [Resource Pack Stack](#packet_resource_pack_stack)\n* C→S: [Resource Pack Client Response](#packet_resource_pack_client_response)\n",
  "!comment,2002": "* S→C: [Start Game](#packet_start_game)\n* S→C: [Creative Content](#packet_creative_content)\n",
  "!comment,2004": "* S→C: [Biome Definition List](#packet_biome_definition_list)\n* S→C: [Chunks](#packet_level_chunk)\n",
  "!comment,2006": "* S→C: [Play Status (Player spawn)](#packet_play_status)\n",
  "!comment,2008": "If there are no resource packs being sent, a Resource Pack Stack can be sent directly\n after Resource Packs Info to avoid the client responses.\n",
  "!comment,2010": "\n===\n",
  "%container,packet_login,": {
    "!id": 1,
    "!bound": "server",
    "!comment,2016": "Protocol version (Big Endian!)\n",
    "protocol_version": "i32",
    "!comment,2018": "The combined size of the `chain` and `client_data`\n",
    "payload_size": "varint",
    "!comment,2020": "JSON array of JWT data: contains the display name, UUID and XUID\nIt should be signed by the Mojang public key\n",
    "chain": "LittleString",
    "!comment,2023": "Skin related data\n",
    "client_data": "LittleString"
  },
  "%container,packet_play_status,": {
    "!id": 2,
    "!bound": "client",
    "%map,status,i32": {
      "!comment,2030": "Sent after Login has been successfully decoded and the player has logged in\n",
      "%n,0": "login_success",
      "!comment,2032": "Displays \"Could not connect: Outdated client!\"\n",
      "%n,1": "failed_client",
      "!comment,2034": "Displays \"Could not connect: Outdated server!\"\n",
      "%n,2": "failed_spawn",
      "!comment,2036": "Sent after world data to spawn the player\n",
      "%n,3": "player_spawn",
      "!comment,2038": "Displays \"Unable to connect to world. Your school does not have access to this server.\"\n",
      "%n,4": "failed_invalid_tenant",
      "!comment,2040": "Displays \"The server is not running Minecraft: Education Edition. Failed to connect.\"\n",
      "%n,5": "failed_vanilla_edu",
      "!comment,2042": "Displays \"The server is running an incompatible edition of Minecraft. Failed to connect.\"\n",
      "%n,6": "failed_edu_vanilla",
      "!comment,2044": "Displays \"Wow this server is popular! Check back later to see if space opens up. Server Full\"\n",
      "%n,7": "failed_server_full"
    }
  },
  "%container,packet_server_to_client_handshake,": {
    "!id": 3,
    "!bound": "client",
    "!comment,2051": "Contains the salt to complete the Diffie-Hellman key exchange\n",
    "token": "string"
  },
  "!comment,2055": "Sent by the client in response to a Server To Client Handshake packet \nsent by the server. It is the first encrypted packet in the login handshake\n",
  "!comment,2057": "and serves as a confirmation that encryption is correctly initialized client side. \nIt has no fields.\n",
  "%container,packet_client_to_server_handshake,": {
    "!id": 4,
    "!bound": "server"
  },
  "!comment,2063": "Sent by the server to disconnect a client.\n",
  "%container,packet_disconnect,": {
    "!id": 5,
    "!bound": "client",
    "!comment,2067": "Specifies if the disconnection screen should be hidden when the client is disconnected, \nmeaning it will be sent directly to the main menu.\n",
    "hide_disconnect_reason": "bool",
    "!comment,2070": "An optional message to show when disconnected.\n",
    "message": "string"
  },
  "%container,packet_resource_packs_info,": {
    "!id": 6,
    "!bound": "client",
    "!comment,2077": "If the resource pack requires the client accept it.\n",
    "must_accept": "bool",
    "!comment,2079": "If scripting is enabled.\n",
    "has_scripts": "bool",
    "!comment,2081": "A list of behaviour packs that the client needs to download before joining the server. \nAll of these behaviour packs will be applied together.\n",
    "behaviour_packs": "BehaviourPackInfos",
    "!comment,2084": "A list of resource packs that the client needs to download before joining the server. \nThe order of these resource packs is not relevant in this packet. It is however important in the Resource Pack Stack packet.\n",
    "texture_packs": "TexturePackInfos"
  },
  "%container,packet_resource_pack_stack,": {
    "!id": 7,
    "!bound": "client",
    "!comment,2091": "If the resource pack must be accepted for the player to join the server.\n",
    "must_accept": "bool",
    "!comment,2093": "[inline]\n",
    "behavior_packs": "ResourcePackIdVersions",
    "!comment,2095": "[inline]\n",
    "resource_packs": "ResourcePackIdVersions",
    "game_version": "string",
    "experiments": "Experiments",
    "experiments_previously_used": "bool"
  },
  "%container,packet_resource_pack_client_response,": {
    "!id": 8,
    "!bound": "server",
    "%map,response_status,u8": {
      "%n,0": "none",
      "%n,1": "refused",
      "%n,2": "send_packs",
      "%n,3": "have_all_packs",
      "%n,4": "completed"
    },
    "!comment,2110": "All of the pack IDs.\n",
    "resourcepackids": "ResourcePackIds"
  },
  "!comment,2113": "Sent by the client to the server to send chat messages, and by the server to the client \nto forward or send messages, which may be chat, popups, tips etc.\n",
  "%container,packet_text,": {
    "!id": 9,
    "!bound": "both",
    "!comment,2120": "TextType is the type of the text sent. When a client sends this to the server, it should always be\nTextTypeChat. If the server sends it, it may be one of the other text types above.\n",
    "%map,type,u8": {
      "%n,0": "raw",
      "%n,1": "chat",
      "%n,2": "translation",
      "%n,3": "popup",
      "%n,4": "jukebox_popup",
      "%n,5": "tip",
      "%n,6": "system",
      "%n,7": "whisper",
      "%n,8": "announcement",
      "%n,9": "json_whisper",
      "%n,10": "json"
    },
    "!comment,2134": "NeedsTranslation specifies if any of the messages need to be translated. It seems that where % is found\nin translatable text types, these are translated regardless of this bool. Translatable text types\n",
    "!comment,2136": "include TextTypeTip, TextTypePopup and TextTypeJukeboxPopup.\n",
    "needs_translation": "bool",
    "%switch,__2138,type": {
      "if chat or whisper or announcement": {
        "source_name": "string",
        "message": "string"
      },
      "if raw or tip or system or json_whisper or json": {
        "message": "string"
      },
      "if translation or popup or jukebox_popup": {
        "message": "string",
        "%array,paramaters,string,varint": null
      }
    },
    "!comment,2147": "The XUID of the player who sent this message.\n",
    "xuid": "string",
    "!comment,2149": "PlatformChatID is an identifier only set for particular platforms when chatting (presumably only for\nNintendo Switch). It is otherwise an empty string, and is used to decide which players are able to\n",
    "!comment,2151": "chat with each other.\n",
    "platform_chat_id": "string"
  },
  "!comment,2153": "For additional information and examples of all the chat types above, see here: https://imgur.com/a/KhcFscg\n",
  "!comment,2156": "Sent by the server to update the current time client-side. The client actually advances time\nclient-side by itself, so this packet does not need to be sent each tick. It is merely a means\n",
  "!comment,2158": "of synchronizing time between server and client.\n",
  "%container,packet_set_time,": {
    "!id": 10,
    "!bound": "client",
    "!comment,2162": "Time is the current time. The time is not limited to 24000 (time of day), but continues \nprogressing after that.\n",
    "time": "zigzag32"
  },
  "!comment,2166": "Sent by the server to send information about the world the player will be spawned in.\n",
  "%container,packet_start_game,": {
    "!id": 11,
    "!bound": "client",
    "!comment,2170": "The unique ID of the player. The unique ID is a value that remains consistent across\ndifferent sessions of the same world, but most unofficial servers simply fill the\n",
    "!comment,2172": "runtime ID of the entity out for this field.\n",
    "entity_id": "zigzag64",
    "!comment,2174": "The runtime ID of the player. The runtime ID is unique for each world session, \nand entities are generally identified in packets using this runtime ID.\n",
    "runtime_entity_id": "varint64",
    "!comment,2177": "PlayerGameMode is the game mode the player currently has. It is a value from 0-4, with 0 being\nsurvival mode, 1 being creative mode, 2 being adventure mode, 3 being survival spectator and 4 being\n",
    "!comment,2179": "creative spectator.\nThis field may be set to 5 to make the client fall back to the game mode set in the WorldGameMode\n",
    "!comment,2181": "field.\n",
    "player_gamemode": "GameMode",
    "!comment,2183": "The spawn position of the player in the world. In servers this is often the same as the \nworld's spawn position found below.\n",
    "player_position": "vec3f",
    "!comment,2186": "The pitch and yaw of the player\n",
    "rotation": "vec2f",
    "!comment,2188": "The seed used to generate the world. Unlike in Java edition, the seed is a 32bit Integer here.\n",
    "seed": "zigzag32",
    "biome_type": "li16",
    "biome_name": "string",
    "!comment,2192": "Dimension is the ID of the dimension that the player spawns in. It is a value from 0-2, \nwith 0 being the overworld, 1 being the nether and 2 being the end.\n",
    "dimension": "zigzag32",
    "!comment,2195": "Generator is the generator used for the world. It is a value from 0-4, with 0 being old\nlimited worlds, 1 being infinite worlds, 2 being flat worlds, 3 being nether worlds and \n",
    "!comment,2197": "4 being end worlds. A value of 0 will actually make the client stop rendering chunks you \nsend beyond the world limit.\n",
    "generator": "zigzag32",
    "!comment,2200": "The world game mode that a player gets when it first spawns in the world. It is shown in the\nsettings and is used if the Player Gamemode is set to 5.\n",
    "world_gamemode": "GameMode",
    "!comment,2203": "Difficulty is the difficulty of the world. It is a value from 0-3, with 0 being peaceful,\n1 being easy, 2 being normal and 3 being hard.\n",
    "difficulty": "zigzag32",
    "!comment,2206": "The block on which the world spawn of the world. This coordinate has no effect on the place\nthat the client spawns, but it does have an effect on the direction that a compass poInts.\n",
    "spawn_position": "BlockCoordinates",
    "!comment,2209": "Defines if achievements are disabled in the world. The client crashes if this value is set \nto true while the player's or the world's game mode is creative, and it's recommended to simply\n",
    "!comment,2211": "always set this to false as a server.\n",
    "achievements_disabled": "bool",
    "!comment,2213": "The time at which the day cycle was locked if the day cycle is disabled using the respective\ngame rule. The client will maIntain this time as Boolean as the day cycle is disabled.\n",
    "day_cycle_stop_time": "zigzag32",
    "!comment,2216": "Some Minecraft: Education Edition field that specifies what 'region' the world was from, \nwith 0 being None, 1 being RestOfWorld, and 2 being China. The actual use of this field is unknown.\n",
    "edu_offer": "zigzag32",
    "!comment,2219": "Specifies if the world has education edition features enabled, such as the blocks or entities\nspecific to education edition.\n",
    "edu_features_enabled": "bool",
    "edu_product_uuid": "string",
    "!comment,2223": "The level specifying the Intensity of the rain falling. When set to 0, no rain falls at all.\n",
    "rain_level": "lf32",
    "lightning_level": "lf32",
    "!comment,2226": "The level specifying the Intensity of the thunder. This may actually be set independently\nfrom the rain level, meaning dark clouds can be produced without rain.\n",
    "has_confirmed_platform_locked_content": "bool",
    "!comment,2229": "Specifies if the world is a multi-player game. This should always be set to true for servers.\n",
    "is_multiplayer": "bool",
    "!comment,2231": "Specifies if LAN broadcast was Intended to be enabled for the world.\n",
    "broadcast_to_lan": "bool",
    "!comment,2233": "The mode used to broadcast the joined game across XBOX Live.\n",
    "xbox_live_broadcast_mode": "varint",
    "!comment,2235": "The mode used to broadcast the joined game across the platform.\n",
    "platform_broadcast_mode": "varint",
    "!comment,2237": "If commands are enabled for the player. It is recommended to always set this to true on the\nserver, as setting it to false means the player cannot, under any circumstance, use a command.\n",
    "enable_commands": "bool",
    "!comment,2240": "Specifies if the texture pack the world might hold is required, meaning the client was\n forced to download it before joining.\n",
    "is_texturepacks_required": "bool",
    "!comment,2243": "Defines game rules currently active with their respective values. The value of these game\n rules may be either 'bool', 'Int32' or 'Float32'. Some game rules are server side only,\n",
    "!comment,2245": "and don't necessarily need to be sent to the client.\n",
    "gamerules": "GameRules",
    "experiments": "Experiments",
    "experiments_previously_used": "bool",
    "!comment,2249": "Specifies if the world had the bonus map setting enabled when generating it.\nIt does not have any effect client-side.\n",
    "bonus_chest": "bool",
    "!comment,2252": "Specifies if the world has the start with map setting enabled, meaning each\njoining player obtains a map. This should always be set to false, because the\n",
    "!comment,2254": "client obtains a map all on its own accord if this is set to true.\n",
    "map_enabled": "bool",
    "!comment,2256": "The permission level of the player. It is a value from 0-3, with 0 being visitor,\n1 being member, 2 being operator and 3 being custom.\n",
    "permission_level": "zigzag32",
    "!comment,2259": "The radius around the player in which chunks are ticked. Most servers set this value\nto a fixed number, as it does not necessarily affect anything client-side.\n",
    "server_chunk_tick_range": "li32",
    "!comment,2262": "Specifies if the texture pack of the world is locked, meaning it cannot be disabled\nfrom the world. This is typically set for worlds on the marketplace that have a dedicated\n",
    "!comment,2264": "texture pack.\n",
    "has_locked_behavior_pack": "bool",
    "!comment,2266": "Specifies if the texture pack of the world is locked, meaning it cannot be disabled from the\nworld. This is typically set for worlds on the marketplace that have a dedicated texture pack.\n",
    "has_locked_resource_pack": "bool",
    "!comment,2269": "Specifies if the world from the server was from a locked world template.\nFor servers this should always be set to false.\n",
    "is_from_locked_world_template": "bool",
    "msa_gamertags_only": "bool",
    "!comment,2273": "Specifies if the world from the server was from a locked world template. \nFor servers this should always be set to false.\n",
    "is_from_world_template": "bool",
    "!comment,2276": "Specifies if the world was a template that locks all settings that change properties \nabove in the settings GUI. It is recommended to set this to true for servers that\n",
    "!comment,2278": "do not allow things such as setting game rules through the GUI.\n",
    "is_world_template_option_locked": "bool",
    "!comment,2280": "A hack that Mojang put in place to preserve backwards compatibility with old villagers. \nThe his never actually read though, so it has no functionality.\n",
    "only_spawn_v1_villagers": "bool",
    "!comment,2283": "The version of the game from which Vanilla features will be used.\nThe exact function of this field isn't clear.\n",
    "game_version": "string",
    "limited_world_width": "li32",
    "limited_world_length": "li32",
    "is_new_nether": "bool",
    "experimental_gameplay_override": "bool",
    "!comment,2290": "A base64 encoded world ID that is used to identify the world.\n",
    "level_id": "string",
    "!comment,2292": "The name of the world that the player is joining. Note that this field shows up\nabove the player list for the rest of the game session, and cannot be changed.\n",
    "!comment,2294": "Setting the server name to this field is recommended.\n",
    "world_name": "string",
    "!comment,2296": "A UUID specific to the premium world template that might have been used to\ngenerate the world. Servers should always fill out an empty String for this.\n",
    "premium_world_template_id": "string",
    "!comment,2299": "Specifies if the world was a trial world, meaning features are limited and there \nis a time limit on the world.\n",
    "is_trial": "bool",
    "!comment,2303": "MovementType specifies the way the server handles player movement. Available options are\npacket.AuthoritativeMovementModeClient, packet.AuthoritativeMovementModeServer and\n",
    "!comment,2305": "packet.AuthoritativeMovementModeServerWithRewind, where server the server authoritative types result\nin the client sending PlayerAuthInput packets instead of MovePlayer packets and the rewind mode\n",
    "!comment,2307": "requires sending the tick of movement and several actions.\n",
    "!comment,2309": "Specifies if the client or server is authoritative over the movement of the player, \nmeaning it controls the movement of it. \n",
    "%map,movement_authority,zigzag32": {
      "%n,0": "client",
      "%n,1": "server",
      "!comment,2315": "PlayerAuthInputPacket + a bunch of junk that solves a nonexisting problem\n",
      "%n,2": "server_with_rewind"
    },
    "!comment,2317": "RewindHistorySize is the amount of history to keep at maximum if MovementType is\npacket.AuthoritativeMovementModeServerWithRewind.\n",
    "rewind_history_size": "zigzag32",
    "!comment,2320": "ServerAuthoritativeBlockBreaking specifies if block breaking should be sent through\npacket.PlayerAuthInput or not. This field is somewhat redundant as it is always enabled if\n",
    "!comment,2322": "MovementType is packet.AuthoritativeMovementModeServer or\npacket.AuthoritativeMovementModeServerWithRewind\n",
    "server_authoritative_block_breaking": "bool",
    "!comment,2326": "The total time in ticks that has elapsed since the start of the world.\n",
    "current_tick": "li64",
    "!comment,2328": "The seed used to seed the random used to produce enchantments in the enchantment table. \nNote that the exact correct random implementation must be used to produce the correct\n",
    "!comment,2330": "results both client- and server-side.\n",
    "enchantment_seed": "zigzag32",
    "!comment,2333": "BlockProperties is a list of all the custom blocks registered on the server.\n",
    "block_properties": "BlockProperties",
    "!comment,2335": "A list of all items with their legacy IDs which are available in the game.\nFailing to send any of the items that are in the game will crash mobile clients.\n",
    "itemstates": "Itemstates",
    "!comment,2338": "A unique ID specifying the multi-player session of the player. \nA random UUID should be filled out for this field.\n",
    "multiplayer_correlation_id": "string",
    "!comment,2341": "ServerAuthoritativeInventory specifies if the server authoritative inventory system is enabled. This\nis a new system introduced in 1.16. Backwards compatibility with the inventory transactions has to\n",
    "!comment,2343": "some extent been preserved, but will eventually be removed.\n",
    "server_authoritative_inventory": "bool"
  },
  "%container,packet_add_player,": {
    "!id": 12,
    "!bound": "client",
    "!comment,2350": "UUID is the UUID of the player. It is the same UUID that the client sent in the\nLogin packet at the start of the session. A player with this UUID must exist\n",
    "!comment,2352": "in the player list (built up using the Player List packet) for it to show up in-game.\n",
    "uuid": "uuid",
    "!comment,2354": "Username is the name of the player. This username is the username that will be\nset as the initial name tag of the player.\n",
    "username": "string",
    "!comment,2357": "The unique ID of the player. The unique ID is a value that remains consistent\n across different sessions of the same world, but most unoffical servers simply \n",
    "!comment,2359": "fill the runtime ID of the player out for this field.\n",
    "entity_id_self": "zigzag64",
    "!comment,2361": "The runtime ID of the player. The runtime ID is unique for each world session,\nand entities are generally identified in packets using this runtime ID.\n",
    "runtime_entity_id": "varint64",
    "!comment,2364": "An identifier only set for particular platforms when chatting (presumably only for \nNintendo Switch). It is otherwise an empty string, and is used to decide which players\n",
    "!comment,2366": "are able to chat with each other.\n",
    "platform_chat_id": "string",
    "x": "lf32",
    "y": "lf32",
    "z": "lf32",
    "speed_x": "lf32",
    "speed_y": "lf32",
    "speed_z": "lf32",
    "pitch": "lf32",
    "yaw": "lf32",
    "head_yaw": "lf32",
    "held_item": "Item",
    "metadata": "MetadataDictionary",
    "flags": "varint",
    "command_permission": "varint",
    "action_permissions": "varint",
    "permission_level": "varint",
    "custom_stored_permissions": "varint",
    "user_id": "li64",
    "links": "Links",
    "device_id": "string",
    "device_os": "li32"
  },
  "%container,packet_add_entity,": {
    "!id": 13,
    "!bound": "client",
    "entity_id_self": "zigzag64",
    "runtime_entity_id": "varint64",
    "entity_type": "string",
    "x": "lf32",
    "y": "lf32",
    "z": "lf32",
    "speed_x": "lf32",
    "speed_y": "lf32",
    "speed_z": "lf32",
    "pitch": "lf32",
    "yaw": "lf32",
    "head_yaw": "lf32",
    "attributes": "EntityAttributes",
    "metadata": "MetadataDictionary",
    "links": "Links"
  },
  "%container,packet_remove_entity,": {
    "!id": 14,
    "!bound": "client",
    "entity_id_self": "zigzag64"
  },
  "%container,packet_add_item_entity,": {
    "!id": 15,
    "!bound": "client",
    "entity_id_self": "zigzag64",
    "runtime_entity_id": "varint64",
    "item": "Item",
    "x": "lf32",
    "y": "lf32",
    "z": "lf32",
    "speed_x": "lf32",
    "speed_y": "lf32",
    "speed_z": "lf32",
    "metadata": "MetadataDictionary",
    "is_from_fishing": "bool"
  },
  "%container,packet_take_item_entity,": {
    "!id": 17,
    "!bound": "client",
    "runtime_entity_id": "varint64",
    "target": "varint"
  },
  "!comment,2434": "MoveActorAbsolute is sent by the server to move an entity to an absolute position. It is typically used\nfor movements where high accuracy isn't needed, such as for long range teleporting.\n",
  "%container,packet_move_entity,": {
    "!id": 18,
    "!bound": "both",
    "!comment,2439": "EntityRuntimeID is the runtime ID of the entity. The runtime ID is unique for each world session, and\nentities are generally identified in packets using this runtime ID.\n",
    "runtime_entity_id": "varint64",
    "!comment,2442": "Flags is a combination of flags that specify details of the movement. It is a combination of the flags\nabove.\n",
    "flags": "u8",
    "!comment,2445": "Position is the position to spawn the entity on. If the entity is on a distance that the player cannot\nsee it, the entity will still show up if the player moves closer.\n",
    "position": "vec3f",
    "!comment,2448": "Rotation is a Vec3 holding the X, Y and Z rotation of the entity after the movement. This is a Vec3 for\nthe reason that projectiles like arrows don't have yaw/pitch, but do have roll.\n",
    "rotation": "Rotation"
  },
  "!comment,2452": "MovePlayer is sent by players to send their movement to the server, and by the server to update the\nmovement of player entities to other players.\n",
  "%container,packet_move_player,": {
    "!id": 19,
    "!bound": "both",
    "!comment,2457": "EntityRuntimeID is the runtime ID of the player. The runtime ID is unique for each world session, and\nentities are generally identified in packets using this runtime ID.\n",
    "runtime_id": "varint",
    "!comment,2460": "Position is the position to spawn the player on. If the player is on a distance that the viewer cannot\nsee it, the player will still show up if the viewer moves closer.\n",
    "position": "vec3f",
    "!comment,2463": "Pitch is the vertical rotation of the player. Facing straight forward yields a pitch of 0. Pitch is\nmeasured in degrees.\n",
    "pitch": "lf32",
    "!comment,2466": "Yaw is the horizontal rotation of the player. Yaw is also measured in degrees\n",
    "yaw": "lf32",
    "!comment,2468": "HeadYaw is the same as Yaw, except that it applies specifically to the head of the player. A different\nvalue for HeadYaw than Yaw means that the player will have its head turned\n",
    "head_yaw": "lf32",
    "!comment,2471": "Mode is the mode of the movement. It specifies the way the player's movement should be shown to other\nplayers. It is one of the constants below.\n",
    "%map,mode,u8": {
      "%n,0": "normal",
      "%n,1": "reset",
      "%n,2": "teleport",
      "%n,3": "rotation"
    },
    "!comment,2478": "OnGround specifies if the player is considered on the ground. Note that proxies or hacked clients could\nfake this to always be true, so it should not be taken for granted.\n",
    "on_ground": "bool",
    "!comment,2481": "RiddenEntityRuntimeID is the runtime ID of the entity that the player might currently be riding. If not\nriding, this should be left 0.\n",
    "ridden_runtime_id": "varint",
    "%switch,teleport,mode": {
      "if teleport": {
        "!comment,2486": "TeleportCause is written only if Mode is MoveModeTeleport. It specifies the cause of the teleportation,\nwhich is one of the constants above.\n",
        "%map,cause,li32": {
          "%n,0": "unknown",
          "%n,1": "projectile",
          "%n,2": "chorus_fruit",
          "%n,3": "command",
          "%n,4": "behavior"
        },
        "!comment,2494": "TeleportSourceEntityType is the entity type that caused the teleportation, for example an ender pearl.\nTODO: is this still a integer and not a string?\n",
        "source_entity_type": "LegacyEntityType"
      }
    },
    "tick": "varint64"
  },
  "%container,packet_rider_jump,": {
    "!id": 20,
    "!bound": "both",
    "jump_strength": "zigzag32"
  },
  "!comment,2504": "UpdateBlock is sent by the server to update a block client-side, without resending the entire chunk that\nthe block is located in. It is particularly useful for small modifications like block breaking/placing.\n",
  "%container,packet_update_block,": {
    "!id": 21,
    "!bound": "client",
    "!comment,2509": "Position is the block position at which a block is updated.\n",
    "position": "BlockCoordinates",
    "!comment,2511": "NewBlockRuntimeID is the runtime ID of the block that is placed at Position after sending the packet\nto the client.\n",
    "block_runtime_id": "varint",
    "!comment,2514": "Flags is a combination of flags that specify the way the block is updated client-side. It is a\ncombination of the flags above, but typically sending only the BlockUpdateNetwork flag is sufficient.\n",
    "flags": "UpdateBlockFlags",
    "!comment,2517": "Layer is the world layer on which the block is updated. For most blocks, this is the first layer, as\nthat layer is the default layer to place blocks on, but for blocks inside of each other, this differs.\n",
    "layer": "varint"
  },
  "UpdateBlockFlags": [
    "bitflags",
    {
      "type": "varint",
      "flags": {
        "neighbors": 1,
        "network": 2,
        "no_graphic": 4,
        "unused": 8,
        "priority": 16
      }
    }
  ],
  "%container,packet_add_painting,": {
    "!id": 22,
    "!bound": "client",
    "entity_id_self": "zigzag64",
    "runtime_entity_id": "varint64",
    "coordinates": "BlockCoordinates",
    "direction": "zigzag32",
    "title": "string"
  },
  "!comment,2544": "TickSync is sent by the client and the server to maintain a synchronized, server-authoritative tick between\nthe client and the server. The client sends this packet first, and the server should reply with another one\n",
  "!comment,2546": "of these packets, including the response time.\n",
  "%container,packet_tick_sync,": {
    "!id": 23,
    "!bound": "both",
    "!comment,2550": "ClientRequestTimestamp is the timestamp on which the client sent this packet to the server. The server\nshould fill out that same value when replying.\n",
    "!comment,2552": "The ClientRequestTimestamp is always 0\n",
    "request_time": "li64",
    "!comment,2554": "ServerReceptionTimestamp is the timestamp on which the server received the packet sent by the client.\nWhen the packet is sent by the client, this value is 0.\n",
    "!comment,2556": "ServerReceptionTimestamp is generally the current tick of the server. It isn't an actual timestamp, as\nthe field implies\n",
    "response_time": "li64"
  },
  "%container,packet_level_sound_event_old,": {
    "!id": 24,
    "!bound": "both",
    "sound_id": "u8",
    "position": "vec3f",
    "block_id": "zigzag32",
    "entity_type": "zigzag32",
    "is_baby_mob": "bool",
    "is_global": "bool"
  },
  "%container,packet_level_event,": {
    "!id": 25,
    "!bound": "client",
    "%map,event,zigzag32": {
      "%n,1000": "sound_click",
      "%n,1001": "sound_click_fail",
      "%n,1002": "sound_shoot",
      "%n,1003": "sound_door",
      "%n,1004": "sound_fizz",
      "%n,1005": "sound_ignite",
      "%n,1007": "sound_ghast",
      "%n,1008": "sound_ghast_shoot",
      "%n,1009": "sound_blaze_shoot",
      "%n,1010": "sound_door_bump",
      "%n,1012": "sound_door_crash",
      "%n,1018": "sound_enderman_teleport",
      "%n,1020": "sound_anvil_break",
      "%n,1021": "sound_anvil_use",
      "%n,1022": "sound_anvil_fall",
      "%n,1030": "sound_pop",
      "%n,1032": "sound_portal",
      "%n,1040": "sound_itemframe_add_item",
      "%n,1041": "sound_itemframe_remove",
      "%n,1042": "sound_itemframe_place",
      "%n,1043": "sound_itemframe_remove_item",
      "%n,1044": "sound_itemframe_rotate_item",
      "%n,1050": "sound_camera",
      "%n,1051": "sound_orb",
      "%n,1052": "sound_totem",
      "%n,1060": "sound_armor_stand_break",
      "%n,1061": "sound_armor_stand_hit",
      "%n,1062": "sound_armor_stand_fall",
      "%n,1063": "sound_armor_stand_place",
      "%n,1064": "pointed_dripstone_land",
      "%n,1065": "dye_used",
      "%n,1066": "ink_sack_used",
      "%n,2000": "particle_shoot",
      "%n,2001": "particle_destroy",
      "%n,2002": "particle_splash",
      "%n,2003": "particle_eye_despawn",
      "%n,2004": "particle_spawn",
      "%n,2005": "particle_crop_growth",
      "%n,2006": "particle_guardian_curse",
      "%n,2007": "particle_death_smoke",
      "%n,2008": "particle_block_force_field",
      "%n,2009": "particle_projectile_hit",
      "%n,2010": "particle_dragon_egg_teleport",
      "%n,2011": "particle_crop_eaten",
      "%n,2012": "particle_critical",
      "%n,2013": "particle_enderman_teleport",
      "%n,2014": "particle_punch_block",
      "%n,2015": "particle_bubble",
      "%n,2016": "particle_evaporate",
      "%n,2017": "particle_destroy_armor_stand",
      "%n,2018": "particle_breaking_egg",
      "%n,2019": "particle_destroy_egg",
      "%n,2020": "particle_evaporate_water",
      "%n,2021": "particle_destroy_block_no_sound",
      "%n,2022": "particle_knockback_roar",
      "%n,2023": "particle_teleport_trail",
      "%n,2024": "particle_point_cloud",
      "%n,2025": "particle_explosion",
      "%n,2026": "particle_block_explosion",
      "%n,2027": "particle_vibration_signal",
      "%n,2028": "particle_dripstone_drip",
      "%n,2029": "particle_fizz_effect",
      "%n,2030": "particle_wax_on",
      "%n,2031": "particle_wax_off",
      "%n,2032": "particle_scrape",
      "%n,2033": "particle_electric_spark",
      "%n,3001": "start_rain",
      "%n,3002": "start_thunder",
      "%n,3003": "stop_rain",
      "%n,3004": "stop_thunder",
      "%n,3005": "pause_game",
      "%n,3006": "pause_game_no_screen",
      "%n,3007": "set_game_speed",
      "%n,3500": "redstone_trigger",
      "%n,3501": "cauldron_explode",
      "%n,3502": "cauldron_dye_armor",
      "%n,3503": "cauldron_clean_armor",
      "%n,3504": "cauldron_fill_potion",
      "%n,3505": "cauldron_take_potion",
      "%n,3506": "cauldron_fill_water",
      "%n,3507": "cauldron_take_water",
      "%n,3508": "cauldron_add_dye",
      "%n,3509": "cauldron_clean_banner",
      "%n,3600": "block_start_break",
      "%n,3601": "block_stop_break",
      "%n,4000": "set_data",
      "%n,9800": "players_sleeping",
      "%n,16384": "add_particle_mask"
    },
    "position": "vec3f",
    "data": "zigzag32"
  },
  "%container,packet_block_event,": {
    "!id": 26,
    "!bound": "client",
    "!comment,2669": "Position is the position of the block that an event occurred at.\n",
    "position": "BlockCoordinates",
    "!comment,2671": "EventType is the type of the block event. \nThe event type decides the way the event data that follows is used\n",
    "%map,type,zigzag32": {
      "%n,0": "sound",
      "%n,1": "change_state"
    },
    "!comment,2676": "EventData holds event type specific data. For chests for example,\nopening the chest means the data must be 1\n",
    "data": "zigzag32"
  },
  "%container,packet_entity_event,": {
    "!id": 27,
    "!bound": "both",
    "runtime_entity_id": "varint64",
    "%map,event_id,u8": {
      "%n,1": "jump",
      "%n,2": "hurt_animation",
      "%n,3": "death_animation",
      "%n,4": "arm_swing",
      "%n,5": "stop_attack",
      "%n,6": "tame_fail",
      "%n,7": "tame_success",
      "%n,8": "shake_wet",
      "%n,9": "use_item",
      "%n,10": "eat_grass_animation",
      "%n,11": "fish_hook_bubble",
      "%n,12": "fish_hook_position",
      "%n,13": "fish_hook_hook",
      "%n,14": "fish_hook_tease",
      "%n,15": "squid_ink_cloud",
      "%n,16": "zombie_villager_cure",
      "%n,18": "respawn",
      "%n,19": "iron_golem_offer_flower",
      "%n,20": "iron_golem_withdraw_flower",
      "%n,21": "love_particles",
      "%n,22": "villager_angry",
      "%n,23": "villager_happy",
      "%n,24": "witch_spell_particles",
      "%n,25": "firework_particles",
      "%n,26": "in_love_particles",
      "%n,27": "silverfish_spawn_animation",
      "%n,28": "guardian_attack",
      "%n,29": "witch_drink_potion",
      "%n,30": "witch_throw_potion",
      "%n,31": "minecart_tnt_prime_fuse",
      "%n,32": "creeper_prime_fuse",
      "%n,33": "air_supply_expired",
      "%n,34": "player_add_xp_levels",
      "%n,35": "elder_guardian_curse",
      "%n,36": "agent_arm_swing",
      "%n,37": "ender_dragon_death",
      "%n,38": "dust_particles",
      "%n,39": "arrow_shake",
      "%n,57": "eating_item",
      "%n,60": "baby_animal_feed",
      "%n,61": "death_smoke_cloud",
      "%n,62": "complete_trade",
      "%n,63": "remove_leash",
      "%n,65": "consume_totem",
      "%n,66": "player_check_treasure_hunter_achievement",
      "%n,67": "entity_spawn",
      "%n,68": "dragon_puke",
      "%n,69": "item_entity_merge",
      "%n,70": "start_swim",
      "%n,71": "balloon_pop",
      "%n,72": "treasure_hunt",
      "%n,73": "agent_summon",
      "%n,74": "charged_crossbow",
      "%n,75": "fall"
    },
    "data": "zigzag32"
  },
  "%container,packet_mob_effect,": {
    "!id": 28,
    "!bound": "client",
    "runtime_entity_id": "varint64",
    "event_id": "u8",
    "effect_id": "zigzag32",
    "amplifier": "zigzag32",
    "particles": "bool",
    "duration": "zigzag32"
  },
  "%container,packet_update_attributes,": {
    "!id": 29,
    "!bound": "client",
    "runtime_entity_id": "varint64",
    "attributes": "PlayerAttributes",
    "tick": "varint64"
  },
  "!comment,2761": "InventoryTransaction is a packet sent by the client. It essentially exists out of multiple sub-packets,\neach of which have something to do with the inventory in one way or another. Some of these sub-packets\n",
  "!comment,2763": "directly relate to the inventory, others relate to interaction with the world, that could potentially\nresult in a change in the inventory.\n",
  "%container,packet_inventory_transaction,": {
    "!id": 30,
    "!bound": "both",
    "transaction": "Transaction"
  },
  "%container,packet_mob_equipment,": {
    "!id": 31,
    "!bound": "both",
    "runtime_entity_id": "varint64",
    "item": "Item",
    "slot": "u8",
    "selected_slot": "u8",
    "window_id": "WindowID"
  },
  "%container,packet_mob_armor_equipment,": {
    "!id": 32,
    "!bound": "both",
    "runtime_entity_id": "varint64",
    "helmet": "Item",
    "chestplate": "Item",
    "leggings": "Item",
    "boots": "Item"
  },
  "!comment,2788": "Interact is sent by the client when it interacts with another entity in some way. It used to be used for\nnormal entity and block interaction, but this is no longer the case now.\n",
  "%container,packet_interact,": {
    "!id": 33,
    "!bound": "both",
    "!comment,2793": "Action type is the ID of the action that was executed by the player. It is one of the constants that\nmay be found above.\n",
    "%map,action_id,u8": {
      "%n,3": "leave_vehicle",
      "%n,4": "mouse_over_entity",
      "%n,6": "open_inventory"
    },
    "!comment,2799": "TargetEntityRuntimeID is the runtime ID of the entity that the player interacted with. This is empty\nfor the InteractActionOpenInventory action type.\n",
    "target_entity_id": "varint64",
    "!comment,2802": "Position associated with the ActionType above. For the InteractActionMouseOverEntity, this is the\nposition relative to the entity moused over over which the player hovered with its mouse/touch. For the\n",
    "!comment,2804": "InteractActionLeaveVehicle, this is the position that the player spawns at after leaving the vehicle.\n",
    "%switch,position,action_id": {
      "if mouse_over_entity or leave_vehicle": "vec3f"
    }
  },
  "%container,packet_block_pick_request,": {
    "!id": 34,
    "!bound": "server",
    "x": "zigzag32",
    "y": "zigzag32",
    "z": "zigzag32",
    "add_user_data": "bool",
    "selected_slot": "u8"
  },
  "%container,packet_entity_pick_request,": {
    "!id": 35,
    "!bound": "server",
    "runtime_entity_id": "lu64",
    "selected_slot": "u8"
  },
  "!comment,2823": "PlayerAction is sent by the client when it executes any action, for example starting to sprint, swim,\nstarting the breaking of a block, dropping an item, etc.\n",
  "%container,packet_player_action,": {
    "!id": 36,
    "!bound": "server",
    "!comment,2828": "EntityRuntimeID is the runtime ID of the player. The runtime ID is unique for each world session, and\nentities are generally identified in packets using this runtime ID.\n",
    "runtime_entity_id": "varint64",
    "!comment,2831": "ActionType is the ID of the action that was executed by the player. It is one of the constants that may\nbe found above.\n",
    "action": "Action",
    "!comment,2834": "BlockPosition is the position of the target block, if the action with the ActionType set concerned a\nblock. If that is not the case, the block position will be zero.\n",
    "position": "BlockCoordinates",
    "!comment,2837": "BlockFace is the face of the target block that was touched. If the action with the ActionType set\nconcerned a block. If not, the face is always 0.\n",
    "face": "zigzag32"
  },
  "%container,packet_hurt_armor,": {
    "!id": 38,
    "!bound": "client",
    "health": "zigzag32"
  },
  "%container,packet_set_entity_data,": {
    "!id": 39,
    "!bound": "both",
    "runtime_entity_id": "varint64",
    "metadata": "MetadataDictionary",
    "tick": "varint"
  },
  "!comment,2853": "SetActorMotion is sent by the server to change the client-side velocity of an entity. It is usually used\nin combination with server-side movement calculation.\n",
  "%container,packet_set_entity_motion,": {
    "!id": 40,
    "!bound": "both",
    "!comment,2858": "EntityRuntimeID is the runtime ID of the entity. The runtime ID is unique for each world session, and\nentities are generally identified in packets using this runtime ID.\n",
    "runtime_entity_id": "varint64",
    "!comment,2861": "Velocity is the new velocity the entity gets. This velocity will initiate the client-side movement of\nthe entity.\n",
    "velocity": "vec3f"
  },
  "!comment,2865": "SetActorLink is sent by the server to initiate an entity link client-side, meaning one entity will start\nriding another.\n",
  "%container,packet_set_entity_link,": {
    "!id": 41,
    "!bound": "client",
    "link": "Link"
  },
  "%container,packet_set_health,": {
    "!id": 42,
    "!bound": "client",
    "health": "zigzag32"
  },
  "%container,packet_set_spawn_position,": {
    "!id": 43,
    "!bound": "client",
    "%map,spawn_type,zigzag32": {
      "%n,0": "player",
      "%n,1": "world"
    },
    "player_position": "BlockCoordinates",
    "dimension": "zigzag32",
    "world_position": "BlockCoordinates"
  },
  "%container,packet_animate,": {
    "!id": 44,
    "!bound": "both",
    "action_id": "zigzag32",
    "runtime_entity_id": "varint64"
  },
  "%container,packet_respawn,": {
    "!id": 45,
    "!bound": "both",
    "x": "lf32",
    "y": "lf32",
    "z": "lf32",
    "state": "u8",
    "runtime_entity_id": "varint64"
  },
  "!comment,2902": "ContainerOpen is sent by the server to open a container client-side. This container must be physically\npresent in the world, for the packet to have any effect. Unlike Java Edition, Bedrock Edition requires that\n",
  "!comment,2904": "chests for example must be present and in range to open its inventory.\n",
  "%container,packet_container_open,": {
    "!id": 46,
    "!bound": "client",
    "!comment,2908": "WindowID is the ID representing the window that is being opened. It may be used later to close the\ncontainer using a ContainerClose packet.\n",
    "window_id": "WindowID",
    "!comment,2911": "ContainerType is the type ID of the container that is being opened when opening the container at the\nposition of the packet. It depends on the block/entity, and could, for example, be the window type of\n",
    "!comment,2913": "a chest or a hopper, but also a horse inventory.\n",
    "window_type": "WindowType",
    "!comment,2915": "ContainerPosition is the position of the container opened. The position must point to a block entity\nthat actually has a container. If that is not the case, the window will not be opened and the packet\n",
    "!comment,2917": "will be ignored, if a valid ContainerEntityUniqueID has not also been provided.\n",
    "coordinates": "BlockCoordinates",
    "!comment,2919": "ContainerEntityUniqueID is the unique ID of the entity container that was opened. It is only used if\nthe ContainerType is one that points to an entity, for example a horse.\n",
    "runtime_entity_id": "zigzag64"
  },
  "!comment,2923": "ContainerClose is sent by the server to close a container the player currently has opened, which was opened\nusing the ContainerOpen packet, or by the client to tell the server it closed a particular container, such\n",
  "!comment,2925": "as the crafting grid.\n",
  "%container,packet_container_close,": {
    "!id": 47,
    "!bound": "both",
    "!comment,2929": "WindowID is the ID representing the window of the container that should be closed. It must be equal to\nthe one sent in the ContainerOpen packet to close the designated window.\n",
    "window_id": "WindowID",
    "!comment,2932": "ServerSide determines whether or not the container was force-closed by the server. If this value is\nnot set correctly, the client may ignore the packet and respond with a PacketViolationWarning.\n",
    "server": "bool"
  },
  "!comment,2936": "PlayerHotBar is sent by the server to the client. It used to be used to link hot bar slots of the player to\nactual slots in the inventory, but as of 1.2, this was changed and hot bar slots are no longer a free\n",
  "!comment,2938": "floating part of the inventory.\nSince 1.2, the packet has been re-purposed, but its new functionality is not clear.\n",
  "%container,packet_player_hotbar,": {
    "!id": 48,
    "!bound": "both",
    "selected_slot": "varint",
    "window_id": "WindowID",
    "select_slot": "bool"
  },
  "!comment,2947": "InventoryContent is sent by the server to update the full content of a particular inventory. It is usually\nsent for the main inventory of the player, but also works for other inventories that are currently opened\n",
  "!comment,2949": "by the player.\n",
  "%container,packet_inventory_content,": {
    "!id": 49,
    "!bound": "both",
    "!comment,2953": "WindowID is the ID that identifies one of the windows that the client currently has opened, or one of\nthe consistent windows such as the main inventory.\n",
    "window_id": "WindowIDVarint",
    "!comment,2956": "Content is the new content of the inventory. The length of this slice must be equal to the full size of\nthe inventory window updated.\n",
    "input": "ItemStacks"
  },
  "!comment,2960": "InventorySlot is sent by the server to update a single slot in one of the inventory windows that the client\ncurrently has opened. Usually this is the main inventory, but it may also be the off hand or, for example,\n",
  "!comment,2962": "a chest inventory.\n",
  "%container,packet_inventory_slot,": {
    "!id": 50,
    "!bound": "both",
    "!comment,2966": "WindowID is the ID of the window that the packet modifies. It must point to one of the windows that the\nclient currently has opened.\n",
    "window_id": "WindowIDVarint",
    "!comment,2969": "Slot is the index of the slot that the packet modifies. The new item will be set to the slot at this\nindex.\n",
    "slot": "varint",
    "!comment,2972": "NewItem is the item to be put in the slot at Slot. It will overwrite any item that may currently\nbe present in that slot.\n",
    "item": "Item"
  },
  "!comment,2976": "ContainerSetData is sent by the server to update specific data of a single container, meaning a block such\nas a furnace or a brewing stand. This data is usually used by the client to display certain features\n",
  "!comment,2978": "client-side.\n",
  "%container,packet_container_set_data,": {
    "!id": 51,
    "!bound": "client",
    "!comment,2982": "WindowID is the ID of the window that should have its data set. The player must have a window open with\nthe window ID passed, or nothing will happen.\n",
    "window_id": "WindowID",
    "!comment,2985": "Key is the key of the property. It is one of the constants that can be found above. Multiple properties\nshare the same key, but the functionality depends on the type of the container that the data is set to.\n",
    "property": "zigzag32",
    "!comment,2988": "Value is the value of the property. Its use differs per property. \n",
    "value": "zigzag32"
  },
  "%container,packet_crafting_data,": {
    "!id": 52,
    "!bound": "client",
    "recipes": "Recipes",
    "potion_type_recipes": "PotionTypeRecipes",
    "potion_container_recipes": "PotionContainerChangeRecipes",
    "is_clean": "bool"
  },
  "!comment,2999": "CraftingEvent is sent by the client when it crafts a particular item. Note that this packet may be fully\nignored, as the InventoryTransaction packet provides all the information required.\n",
  "%container,packet_crafting_event,": {
    "!id": 53,
    "!bound": "both",
    "!comment,3004": "WindowID is the ID representing the window that the player crafted in.\n",
    "window_id": "WindowID",
    "!comment,3006": "CraftingType is a type that indicates the way the crafting was done, for example if a crafting table\nwas used.\n",
    "%map,recipe_type,zigzag32": {
      "%n,0": "inventory",
      "%n,1": "crafting",
      "%n,2": "workbench"
    },
    "!comment,3012": "RecipeUUID is the UUID of the recipe that was crafted. It points to the UUID of the recipe that was\nsent earlier in the CraftingData packet.\n",
    "recipe_id": "uuid",
    "!comment,3015": "Input is a list of items that the player put into the recipe so that it could create the Output items.\nThese items are consumed in the process.\n",
    "%array,input,Item,varint": null,
    "!comment,3018": "Output is a list of items that were obtained as a result of crafting the recipe.\n",
    "%array,result,Item,varint": null
  },
  "!comment,3021": "GUIDataPickItem is sent by the server to make the client 'select' a hot bar slot. It currently appears to\nbe broken however, and does not actually set the selected slot to the hot bar slot set in the packet.\n",
  "%container,packet_gui_data_pick_item,": {
    "!id": 54,
    "!bound": "client",
    "!comment,3026": "ItemName is the name of the item that shows up in the top part of the popup that shows up when\nselecting an item. It is shown as if an item was selected by the player itself.\n",
    "item_name": "string",
    "!comment,3029": "ItemEffects is the line under the ItemName, where the effects of the item are usually situated.\n",
    "item_effects": "string",
    "!comment,3031": "HotBarSlot is the hot bar slot to be selected/picked. This does not currently work, so it does not\nmatter what number this is.\n",
    "hotbar_slot": "li32"
  },
  "!comment,3035": "AdventureSettings is sent by the server to update game-play related features, in particular permissions to\naccess these features for the client. It includes allowing the player to fly, build and mine, and attack\n",
  "!comment,3037": "entities. Most of these flags should be checked server-side instead of using this packet only.\nThe client may also send this packet to the server when it updates one of these settings through the\n",
  "!comment,3039": "in-game settings interface. The server should verify if the player actually has permission to update those\nsettings.\n",
  "%container,packet_adventure_settings,": {
    "!id": 55,
    "!bound": "both",
    "!comment,3044": "Flags is a set of flags that specify certain properties of the player, such as whether or not it can\nfly and/or move through blocks. It is one of the AdventureFlag constants above.\n",
    "flags": "AdventureFlags",
    "!comment,3047": "CommandPermissionLevel is a permission level that specifies the kind of commands that the player is\nallowed to use.\n",
    "%map,command_permission,varint32": {
      "%n,0": "normal",
      "%n,1": "operator",
      "%n,2": "host",
      "%n,3": "automation",
      "%n,4": "admin"
    },
    "!comment,3055": "ActionPermissions is, much like Flags, a set of flags that specify actions that the player is allowed\nto undertake, such as whether it is allowed to edit blocks, open doors etc. It is a combination of the\n",
    "!comment,3057": "ActionPermission constants above.\n",
    "action_permissions": "ActionPermissions",
    "!comment,3059": "PermissionLevel is the permission level of the player as it shows up in the player list built up using\nthe PlayerList packet. It is one of the PermissionLevel constants above.\n",
    "%map,permission_level,varint": {
      "%n,0": "visitor",
      "%n,1": "member",
      "%n,2": "operator",
      "%n,3": "custom"
    },
    "!comment,3066": "Custom permissions\n",
    "custom_stored_permissions": "varint",
    "!comment,3068": "PlayerUniqueID is a unique identifier of the player. It appears it is not required to fill this field\nout with a correct value. Simply writing 0 seems to work.\n",
    "user_id": "li64"
  },
  "AdventureFlags": [
    "bitflags",
    {
      "type": "varint",
      "flags": {
        "world_immutable": 1,
        "no_pvp": 2,
        "auto_jump": 32,
        "allow_flight": 64,
        "no_clip": 128,
        "world_builder": 256,
        "flying": 512,
        "muted": 1024
      }
    }
  ],
  "ActionPermissions": [
    "bitflags",
    {
      "type": "varint",
      "flags": {
        "mine": 65537,
        "doors_and_switches": 65538,
        "open_containers": 65540,
        "attack_players": 65544,
        "attack_mobs": 65552,
        "operator": 65568,
        "teleport": 65664,
        "build": 65792,
        "default": 66048
      }
    }
  ],
  "%container,packet_block_entity_data,": {
    "!id": 56,
    "!bound": "both",
    "position": "BlockCoordinates",
    "nbt": "nbt"
  },
  "%container,packet_player_input,": {
    "!id": 57,
    "!bound": "server",
    "motion_x": "lf32",
    "motion_z": "lf32",
    "jumping": "bool",
    "sneaking": "bool"
  },
  "!comment,3120": "LevelChunk is sent by the server to provide the client with a chunk of a world data (16xYx16 blocks).\nTypically a certain amount of chunks is sent to the client before sending it the spawn PlayStatus packet,\n",
  "!comment,3122": "so that the client spawns in a loaded world.\n",
  "%container,packet_level_chunk,": {
    "!id": 58,
    "!bound": "client",
    "!comment,3126": "ChunkX is the X coordinate of the chunk sent. (To translate a block's X to a chunk's X: x >> 4)\n",
    "x": "zigzag32",
    "!comment,3128": "ChunkZ is the Z coordinate of the chunk sent. (To translate a block's Z to a chunk's Z: z >> 4)\n",
    "z": "zigzag32",
    "!comment,3130": "SubChunkCount is the amount of sub chunks that are part of the chunk sent. Depending on if the cache\nis enabled, a list of blob hashes will be sent, or, if disabled, the sub chunk data.\n",
    "sub_chunk_count": "varint",
    "!comment,3133": "CacheEnabled specifies if the client blob cache should be enabled. This system is based on hashes of\nblobs which are consistent and saved by the client in combination with that blob, so that the server\n",
    "!comment,3135": "does not have to send the same chunk multiple times. If the client does not yet have a blob with the hash sent,\nit will send a ClientCacheBlobStatus packet containing the hashes is does not have the data of.\n",
    "cache_enabled": "bool",
    "%switch,blobs,cache_enabled": {
      "if true": {
        "!comment,3140": "BlobHashes is a list of all blob hashes used in the chunk. It is composed of SubChunkCount + 1 hashes,\nwith the first SubChunkCount hashes being those of the sub chunks and the last one that of the biome\n",
        "!comment,3142": "of the chunk.\nIf CacheEnabled is set to false, BlobHashes can be left empty.\n",
        "%array,hashes,lu64,varint": null
      }
    },
    "!comment,3145": "RawPayload is a serialised string of chunk data. The data held depends on if CacheEnabled is set to\ntrue. If set to false, the payload is composed of multiple sub-chunks, each of which carry a version\n",
    "!comment,3147": "which indicates the way they are serialised, followed by biomes, border blocks and tile entities. If\nCacheEnabled is true, the payload consists out of the border blocks and tile entities only.\n",
    "payload": "ByteArray"
  },
  "%container,packet_set_commands_enabled,": {
    "!id": 59,
    "!bound": "client",
    "enabled": "bool"
  },
  "%container,packet_set_difficulty,": {
    "!id": 60,
    "!bound": "client",
    "difficulty": "varint"
  },
  "%container,packet_change_dimension,": {
    "!id": 61,
    "!bound": "client",
    "dimension": "zigzag32",
    "position": "vec3f",
    "respawn": "bool"
  },
  "!comment,3168": "SetPlayerGameType is sent by the server to update the game type (game mode) of the player\n",
  "%container,packet_set_player_game_type,": {
    "!id": 62,
    "!bound": "both",
    "!comment,3172": "The new gamemode for the player. \nSome of these game types require additional flags to be set in an AdventureSettings packet for \n",
    "!comment,3174": "the game mode to obtain its full functionality.\n",
    "gamemode": "GameMode"
  },
  "%container,packet_player_list,": {
    "!id": 63,
    "!bound": "client",
    "records": "PlayerRecords"
  },
  "%container,packet_simple_event,": {
    "!id": 64,
    "!bound": "client",
    "event_type": "lu16"
  },
  "!comment,3187": "Event is sent by the server to send an event with additional data. It is typically sent to the client for\ntelemetry reasons, much like the SimpleEvent packet.\n",
  "%container,packet_event,": {
    "!id": 65,
    "!bound": "client",
    "runtime_id": "varint64",
    "%map,event_type,zigzag32": {
      "%n,0": "achievement_awarded",
      "%n,1": "entity_interact",
      "%n,2": "portal_built",
      "%n,3": "portal_used",
      "%n,4": "mob_killed",
      "%n,5": "cauldron_used",
      "%n,6": "player_death",
      "%n,7": "boss_killed",
      "%n,8": "agent_command",
      "%n,9": "agent_created",
      "%n,10": "banner_pattern_removed",
      "%n,11": "commaned_executed",
      "%n,12": "fish_bucketed",
      "%n,13": "mob_born",
      "%n,14": "pet_died",
      "%n,15": "cauldron_block_used",
      "%n,16": "composter_block_used",
      "%n,17": "bell_block_used",
      "%n,18": "actor_definition",
      "%n,19": "raid_update",
      "%n,20": "player_movement_anomaly",
      "%n,21": "player_moement_corrected",
      "%n,22": "honey_harvested",
      "%n,23": "target_block_hit",
      "%n,24": "piglin_barter"
    },
    "use_player_id": "u8",
    "event_data": "restBuffer"
  },
  "%container,packet_spawn_experience_orb,": {
    "!id": 66,
    "!bound": "client",
    "position": "vec3f",
    "count": "zigzag32"
  },
  "UpdateMapFlags": [
    "bitflags",
    {
      "type": "varint",
      "flags": [
        "void",
        "texture",
        "decoration",
        "initialisation"
      ]
    }
  ],
  "!comment,3238": "ClientBoundMapItemData is sent by the server to the client to update the data of a map shown to the client.\nIt is sent with a combination of flags that specify what data is updated.\n",
  "!comment,3240": "The ClientBoundMapItemData packet may be used to update specific parts of the map only. It is not required\nto send the entire map each time when updating one part.\n",
  "%container,packet_clientbound_map_item_data,": {
    "!id": 67,
    "!bound": "client",
    "!comment,3245": "MapID is the unique identifier that represents the map that is updated over network. It remains\nconsistent across sessions.\n",
    "map_id": "zigzag64",
    "!comment,3248": "UpdateFlags is a combination of flags found above that indicate what parts of the map should be updated\nclient-side.\n",
    "update_flags": "UpdateMapFlags",
    "!comment,3251": "Dimension is the dimension of the map that should be updated, for example the overworld (0), the nether\n(1) or the end (2).\n",
    "dimension": "u8",
    "!comment,3254": "LockedMap specifies if the map that was updated was a locked map, which may be done using a cartography\ntable.\n",
    "locked": "bool",
    "!comment,3257": "The following fields apply only for the MapUpdateFlagInitialisation.\nMapsIncludedIn holds an array of map IDs that the map updated is included in. This has to do with the\n",
    "!comment,3259": "scale of the map: Each map holds its own map ID and all map IDs of maps that include this map and have\na bigger scale. This means that a scale 0 map will have 5 map IDs in this slice, whereas a scale 4 map\n",
    "!comment,3261": "will have only 1 (its own).\nThe actual use of this field remains unknown.\n",
    "%switch,included_in,update_flags.initialisation": {
      "%array,if true,zigzag64,varint": null
    },
    "!comment,3265": "Scale is the scale of the map as it is shown in-game. It is written when any of the MapUpdateFlags are\nset to the UpdateFlags field.\n",
    "%switch,scale,update_flags.initialisation || update_flags.decoration || update_flags.texture": {
      "if true": "u8"
    },
    "!comment,3269": "The following fields apply only for the MapUpdateFlagDecoration.\nTrackedObjects is a list of tracked objects on the map, which may either be entities or blocks. The\n",
    "!comment,3271": "client makes sure these tracked objects are actually tracked. (position updated etc.)\n",
    "%switch,tracked,update_flags.decoration": {
      "if true": {
        "%array,objects,TrackedObject,varint": null,
        "%array,decorations,MapDecoration,varint": null
      }
    },
    "!comment,3276": "Updates to the map contents itself (texture)\n",
    "%switch,texture,update_flags.texture": {
      "if true": {
        "!comment,3279": "Width is the width of the texture area that was updated. The width may be a subset of the total width\nof the map.\n",
        "width": "zigzag32",
        "!comment,3282": "Height is the height of the texture area that was updated. The height may be a subset of the total\nheight of the map\n",
        "height": "zigzag32",
        "!comment,3285": "XOffset is the X offset in pixels at which the updated texture area starts. From this X, the updated\ntexture will extend exactly Width pixels to the right.\n",
        "x_offset": "zigzag32",
        "!comment,3288": "YOffset is the Y offset in pixels at which the updated texture area starts. From this Y, the updated\ntexture will extend exactly Height pixels up.\n",
        "y_offset": "zigzag32",
        "!comment,3291": "Pixels is a list of pixel colours for the new texture of the map. It is indexed as Pixels[y][x], with\nthe length of the outer slice having to be exactly Height long and the inner slices exactly Width long.\n",
        "!comment,3293": "To access this array, use $width * y + x\n",
        "%array,pixels,varint,varint": null
      }
    }
  },
  "%container,packet_map_info_request,": {
    "!id": 68,
    "!bound": "both",
    "map_id": "zigzag64"
  },
  "%container,packet_request_chunk_radius,": {
    "!id": 69,
    "!bound": "both",
    "chunk_radius": "zigzag32"
  },
  "%container,packet_chunk_radius_update,": {
    "!id": 70,
    "!bound": "client",
    "chunk_radius": "zigzag32"
  },
  "%container,packet_item_frame_drop_item,": {
    "!id": 71,
    "!bound": "both",
    "coordinates": "BlockCoordinates"
  },
  "%container,packet_game_rules_changed,": {
    "!id": 72,
    "!bound": "client",
    "rules": "GameRules"
  },
  "!comment,3322": "Camera is sent by the server to use an Education Edition camera on a player. It produces an image\nclient-side.\n",
  "%container,packet_camera,": {
    "!id": 73,
    "!bound": "client",
    "!comment,3327": "CameraEntityUniqueID is the unique ID of the camera entity from which the picture was taken.\n",
    "camera_entity_unique_id": "zigzag64",
    "!comment,3329": "TargetPlayerUniqueID is the unique ID of the target player. The unique ID is a value that remains\nconsistent across different sessions of the same world, but most servers simply fill the runtime ID of\n",
    "!comment,3331": "the player out for this field.\n",
    "target_player_unique_id": "zigzag64"
  },
  "%container,packet_boss_event,": {
    "!id": 74,
    "!bound": "both",
    "boss_entity_id": "zigzag64",
    "%map,type,varint": {
      "!comment,3339": "S2C: Shows the boss-bar to the player.\n",
      "%n,0": "show_bar",
      "!comment,3341": "C2S: Registers a player to a boss fight.\n",
      "%n,1": "register_player",
      "!comment,3343": "S2C: Removes the boss-bar from the client.\n",
      "%n,2": "hide_bar",
      "!comment,3345": "C2S: Unregisters a player from a boss fight.\n",
      "%n,3": "unregister_player",
      "!comment,3347": "S2C: Sets the bar percentage.\n",
      "%n,4": "set_bar_progress",
      "!comment,3349": "S2C: Sets title of the bar.\n",
      "%n,5": "set_bar_title",
      "!comment,3351": "S2C: darkens the sky\n",
      "%n,6": "update_properties",
      "!comment,3353": "S2C: Not implemented :( Intended to alter bar appearance, but these currently produce no effect on client-side whatsoever.\n",
      "%n,7": "texture"
    },
    "%switch,__3355,type": {
      "if register_player or unregister_player": {
        "player_id": "zigzag64"
      },
      "if show": {
        "title": "string",
        "bar_progress": "lf32"
      },
      "if update_properties": {
        "darkness_factor": "li16"
      },
      "if texture": {
        "color": "varint",
        "overlay": "varint"
      },
      "if set_bar_progress": {
        "bar_progress": "lf32"
      },
      "if set_bar_title": {
        "title": "string"
      }
    }
  },
  "%container,packet_show_credits,": {
    "!id": 75,
    "!bound": "client",
    "runtime_entity_id": "varint64",
    "status": "zigzag32"
  },
  "!comment,3377": "This packet sends a list of commands to the client. Commands can have\narguments, and some of those arguments can have 'enum' values, which are a list of possible\n",
  "!comment,3379": "values for the argument. The serialization is rather complex and involves palettes like chunks.\n",
  "%container,packet_available_commands,": {
    "!id": 76,
    "!bound": "client",
    "!comment,3384": "The length of the enums for all the command paramaters in this packet\n",
    "values_len": "varint",
    "!comment,3386": "Not read from stream: instead calculated from the `values_len` field\n",
    "!comment,3388": "If the values_len < 0xff => byte,\nIf the values_len < 0xffff => short,\n",
    "!comment,3390": "If the values_len < 0xffffff => int\n",
    "_enum_type": "[\"enum_size_based_on_values_len\"]",
    "!comment,3392": "Here all the enum values for all of the possible commands are stored to one array palette\n",
    "%array,enum_values,string,$values_len": null,
    "!comment,3394": "Integer paramaters may sometimes have a prefix, such as the XP command:\n/xp <amount: int> [player: target] <- here, the xp command gives experience points\n",
    "!comment,3396": "/xp <amount: int>L [player: target] <- here, the xp command gives experience levels\nThis is the palette of suffixes\n",
    "%array,suffixes,string,varint": null,
    "!comment,3399": "The list of enum objects\n",
    "%array,enums,,varint": {
      "!comment,3401": "The name of the enum\n",
      "name": "string",
      "!comment,3403": "The values in the enum \n",
      "%array,values,,varint": {
        "!comment,3405": "The indexes to value in the palette\n",
        "%switch,__3406,../_enum_type": {
          "if byte": "u8",
          "if short": "lu16",
          "if int": "lu32"
        }
      }
    },
    "%array,command_data,,varint": {
      "name": "string",
      "description": "string",
      "flags": "u8",
      "permission_level": "u8",
      "alias": "li32",
      "!comment,3416": "The list of overload paramaters for this command\n",
      "%array,overloads,,varint": {
        "!comment,3418": "Each of the paramaters gets an array of posible overloads\n",
        "%array,__3419,,varint": {
          "!comment,3420": "The name of the paramater shown to the user (the `amount` in `/xp <amount: int>`)\n",
          "paramater_name": "string",
          "%map,value_type,lu16": {
            "%n,1": "int",
            "%n,2": "float",
            "%n,3": "value",
            "%n,4": "wildcard_int",
            "%n,5": "operator",
            "%n,6": "target",
            "%n,16": "file_path",
            "%n,32": "string",
            "%n,40": "position",
            "%n,44": "message",
            "%n,46": "raw_text",
            "%n,50": "json",
            "%n,63": "command"
          },
          "!comment,3436": "In MC, this + prior field are combined to one 32bit bitfield\n",
          "%map,enum_type,lu16": {
            "%n,16": "valid",
            "%n,32": "enum",
            "%n,256": "suffixed",
            "%n,1024": "soft_enum"
          },
          "!comment,3442": "Is this paramater required?\n",
          "optional": "bool",
          "!comment,3444": "Additinal options for this command (thanks macroshaft...)\n",
          "options": "CommandFlags"
        }
      }
    },
    "!comment,3446": "There are two types of enums: static enums which cannot be changed after sending AvaliableCommands,\n(unless you resend the whole packet) and 'soft' or 'dynamic' enums like below which is an array\n",
    "!comment,3448": "that can be updated with the UpdateSoftEnum packet\n",
    "%array,dynamic_enums,,varint": {
      "name": "string",
      "%array,values,string,varint": null
    },
    "%array,enum_constraints,,varint": {
      "value_index": "li32",
      "enum_index": "li32",
      "%array,constraints,,varint": {
        "%map,constraint,u8": {
          "%n,0": "cheats_enabled",
          "%n,1": "operator_permissions",
          "%n,2": "host_permissions"
        }
      }
    }
  },
  "!comment,3461": "ParamOptionCollapseEnum specifies if the enum (only if the Type is actually an enum type. If not,\nsetting this to true has no effect) should be collapsed. This means that the options of the enum are\n",
  "!comment,3463": "never shown in the actual usage of the command, but only as auto-completion, like it automatically does\nwith enums that have a big amount of options. To illustrate, it can make\n",
  "!comment,3465": "<false|true|yes|no> <$Name: bool>.\n",
  "CommandFlags": [
    "bitfield",
    [
      {
        "name": "unused",
        "size": 6,
        "signed": false
      },
      {
        "name": "has_semantic_constraint",
        "size": 1,
        "signed": false
      },
      {
        "name": "collapse_enum",
        "size": 1,
        "signed": false
      }
    ]
  ],
  "!comment,3472": "enum_size_based_on_values_len: native\n",
  "!comment,3474": "CommandRequest is sent by the client to request the execution of a server-side command. Although some\nservers support sending commands using the Text packet, this packet is guaranteed to have the correct\n",
  "!comment,3476": "result.\n",
  "%container,packet_command_request,": {
    "!id": 77,
    "!bound": "server",
    "!comment,3480": "CommandLine is the raw entered command line. The client does no parsing of the command line by itself\n(unlike it did in the early stages), but lets the server do that.\n",
    "command": "string",
    "!comment,3483": "Origin holds information about the command sender that will be returnd back in the command response\n",
    "origin": "CommandOrigin",
    "!comment,3485": "Internal specifies if the command request internal. Setting it to false seems to work and the usage of\nthis field is not known.\n",
    "interval": "bool"
  },
  "%container,packet_command_block_update,": {
    "!id": 78,
    "!bound": "server",
    "is_block": "bool"
  },
  "%container,packet_command_output,": {
    "!id": 79,
    "!bound": "client",
    "!comment,3498": "CommandOrigin is the data specifying the origin of the command. In other words, the source that the\ncommand request was from, such as the player itself or a websocket server. The client forwards the\n",
    "!comment,3500": "messages in this packet to the right origin, depending on what is sent here.\n",
    "origin": "CommandOrigin",
    "!comment,3502": "OutputType specifies the type of output that is sent.\n",
    "%map,output_type,i8": {
      "%n,1": "last",
      "%n,2": "silent",
      "%n,3": "all",
      "%n,4": "data_set"
    },
    "!comment,3508": "SuccessCount is the amount of times that a command was executed successfully as a result of the command\nthat was requested. For servers, this is usually a rather meaningless fields, but for vanilla, this is\n",
    "!comment,3510": "applicable for commands created with Functions.\n",
    "success_count": "varint",
    "!comment,3512": "OutputMessages is a list of all output messages that should be sent to the player. Whether they are\nshown or not, depends on the type of the messages.\n",
    "%array,output,,varint": {
      "!comment,3515": "Success indicates if the output message was one of a successful command execution. If set to true, the\noutput message is by default coloured white, whereas if set to false, the message is by default\n",
      "!comment,3517": "coloured red.\n",
      "success": "bool",
      "!comment,3519": "Message is the message that is sent to the client in the chat window. It may either be simply a\nmessage or a translated built-in string like 'commands.tp.success.coordinates', combined with specific\n",
      "!comment,3521": "parameters below.\n",
      "message_id": "string",
      "!comment,3523": "Parameters is a list of parameters that serve to supply the message sent with additional information,\nsuch as the position that a player was teleported to or the effect that was applied to an entity.\n",
      "!comment,3525": "These parameters only apply for the Minecraft built-in command output.\n",
      "%array,paramaters,string,varint": null
    },
    "%switch,data_set,output_type": {
      "if data_set": "string",
      "default": "void"
    }
  },
  "!comment,3532": "UpdateTrade is sent by the server to update the trades offered by a villager to a player. It is sent at the\nmoment that a player interacts with a villager.\n",
  "%container,packet_update_trade,": {
    "!id": 80,
    "!bound": "client",
    "!comment,3537": "WindowID is the ID that identifies the trading window that the client currently has opened.\n",
    "window_id": "WindowID",
    "!comment,3539": "WindowType is an identifier specifying the type of the window opened. In vanilla, it appears this is\nalways filled out with 15.\n",
    "window_type": "WindowType",
    "!comment,3542": "Size is the amount of trading options that the villager has.\n",
    "size": "varint",
    "!comment,3544": "TradeTier is the tier of the villager that the player is trading with. The tier starts at 0 with a\nfirst two offers being available, after which two additional offers are unlocked each time the tier\n",
    "!comment,3546": "becomes one higher.\n",
    "trade_tier": "varint",
    "!comment,3548": "VillagerUniqueID is the unique ID of the villager entity that the player is trading with. The\nTradeTier sent above applies to this villager.\n",
    "villager_unique_id": "varint64",
    "!comment,3551": "EntityUniqueID is the unique ID of the entity (usually a player) for which the trades are updated. The\nupdated trades may apply only to this entity.\n",
    "entity_unique_id": "varint64",
    "!comment,3554": "DisplayName is the name displayed at the top of the trading UI. It is usually used to represent the\nprofession of the villager in the UI.\n",
    "display_name": "string",
    "!comment,3557": "NewTradeUI specifies if the villager should be using the new trade UI (The one added in 1.11.) rather\nthan the old one. This should usually be set to true.\n",
    "new_trading_ui": "bool",
    "!comment,3560": "Trading based on Minecraft economy - specifies if the prices of the villager's offers are modified by an increase in\ndemand for the item. (A mechanic added in 1.11.) Buying more of the same item will increase the price\n",
    "!comment,3562": "of that particular item.\nhttps://minecraft.gamepedia.com/Trading#Economics\n",
    "economic_trades": "bool",
    "!comment,3565": "NBT serialised compound of offers that the villager has.\n",
    "offers": "nbt"
  },
  "!comment,3568": "UpdateEquip is sent by the server to the client upon opening a horse inventory. It is used to set the\ncontent of the inventory and specify additional properties, such as the items that are allowed to be put\n",
  "!comment,3570": "in slots of the inventory.\n",
  "%container,packet_update_equipment,": {
    "!id": 81,
    "!bound": "client",
    "!comment,3574": "WindowID is the identifier associated with the window that the UpdateEquip packet concerns. It is the\nID sent for the horse inventory that was opened before this packet was sent.\n",
    "window_id": "WindowID",
    "!comment,3577": "WindowType is the type of the window that was opened. Generally, this is the type of a horse inventory,\nas the packet is specifically made for that.\n",
    "window_type": "WindowType",
    "!comment,3580": "Size is the size of the horse inventory that should be opened. A bigger size does, in fact, change the\namount of slots displayed.\n",
    "size": "u8",
    "!comment,3583": "EntityUniqueID is the unique ID of the entity whose equipment was 'updated' to the player. It is\ntypically the horse entity that had its inventory opened.\n",
    "entity_id": "zigzag64",
    "!comment,3586": "`inventory` is a network NBT serialised compound holding the content of the inventory of\nthe entity (the equipment) and additional data such as the allowed items for a particular slot, used to\n",
    "!comment,3588": "make sure only saddles can be put in the saddle slot etc.\n",
    "inventory": "nbt"
  },
  "%container,packet_resource_pack_data_info,": {
    "!id": 82,
    "!bound": "client",
    "package_id": "string",
    "max_chunk_size": "lu32",
    "chunk_count": "lu32",
    "compressed_package_size": "lu64",
    "hash": "ByteArray",
    "is_premium": "bool",
    "pack_type": "u8"
  },
  "%container,packet_resource_pack_chunk_data,": {
    "!id": 83,
    "!bound": "client",
    "package_id": "string",
    "chunk_index": "lu32",
    "progress": "lu64",
    "payload": "ByteArray"
  },
  "%container,packet_resource_pack_chunk_request,": {
    "!id": 84,
    "!bound": "server",
    "package_id": "string",
    "chunk_index": "lu32"
  },
  "%container,packet_transfer,": {
    "!id": 85,
    "!bound": "client",
    "server_address": "string",
    "port": "lu16"
  },
  "%container,packet_play_sound,": {
    "!id": 86,
    "!bound": "client",
    "name": "string",
    "coordinates": "BlockCoordinates",
    "volume": "lf32",
    "pitch": "lf32"
  },
  "%container,packet_stop_sound,": {
    "!id": 87,
    "!bound": "client",
    "name": "string",
    "stop_all": "bool"
  },
  "!comment,3636": "SetTitle is sent by the server to make a title, subtitle or action bar shown to a player. It has several\nfields that allow setting the duration of the titles.\n",
  "%container,packet_set_title,": {
    "!id": 88,
    "!bound": "client",
    "!comment,3641": "ActionType is the type of the action that should be executed upon the title of a player. It is one of\nthe constants above and specifies the response of the client to the packet.\n",
    "%map,type,zigzag32": {
      "%n,0": "clear",
      "%n,1": "reset",
      "%n,2": "set_title",
      "%n,3": "set_subtitle",
      "%n,4": "action_bar_message",
      "%n,5": "set_durations",
      "%n,6": "set_title_json",
      "%n,7": "set_subtitle_json",
      "%n,8": "action_bar_message_json"
    },
    "!comment,3653": "Text is the text of the title, which has a different meaning depending on the ActionType that the\npacket has. The text is the text of a title, subtitle or action bar, depending on the type set.\n",
    "text": "string",
    "!comment,3656": "FadeInDuration is the duration that the title takes to fade in on the screen of the player. It is\nmeasured in 20ths of a second (AKA in ticks).\n",
    "fade_in_time": "zigzag32",
    "!comment,3659": "RemainDuration is the duration that the title remains on the screen of the player. It is measured in\n20ths of a second (AKA in ticks).\n",
    "stay_time": "zigzag32",
    "!comment,3662": "FadeOutDuration is the duration that the title takes to fade out of the screen of the player. It is\nmeasured in 20ths of a second (AKA in ticks).\n",
    "fade_out_time": "zigzag32"
  },
  "%container,packet_add_behavior_tree,": {
    "!id": 89,
    "!bound": "client",
    "behaviortree": "string"
  },
  "%container,packet_structure_block_update,": {
    "!id": 90,
    "!bound": "client"
  },
  "%container,packet_show_store_offer,": {
    "!id": 91,
    "!bound": "client",
    "unknown0": "string",
    "unknown1": "bool"
  },
  "%container,packet_purchase_receipt,": {
    "!id": 92,
    "!bound": "server"
  },
  "%container,packet_player_skin,": {
    "!id": 93,
    "!bound": "both",
    "uuid": "uuid",
    "skin": "Skin",
    "skin_name": "string",
    "old_skin_name": "string",
    "is_verified": "bool"
  },
  "%container,packet_sub_client_login,": {
    "!id": 94,
    "!bound": "client"
  },
  "%container,packet_initiate_web_socket_connection,": {
    "!id": 95,
    "!bound": "client",
    "server": "string"
  },
  "%container,packet_set_last_hurt_by,": {
    "!id": 96,
    "!bound": "client",
    "unknown": "varint"
  },
  "%container,packet_book_edit,": {
    "!id": 97,
    "!bound": "client",
    "%map,type,u8": {
      "%n,0": "replace_page",
      "%n,1": "add_page",
      "%n,2": "delete_page",
      "%n,3": "swap_pages",
      "%n,4": "sign"
    },
    "slot": "u8",
    "%switch,__3718,type": {
      "if replace_page or add_page": {
        "page_number": "u8",
        "text": "string",
        "photo_name": "string"
      },
      "if delete_page": {
        "page_number": "u8"
      },
      "if swap_pages": {
        "page1": "u8",
        "page2": "u8"
      },
      "if sign": {
        "title": "string",
        "author": "string",
        "xuid": "string"
      }
    }
  },
  "%container,packet_npc_request,": {
    "!id": 98,
    "!bound": "both",
    "runtime_entity_id": "varint64",
    "unknown0": "u8",
    "unknown1": "string",
    "unknown2": "u8"
  },
  "%container,packet_photo_transfer,": {
    "!id": 99,
    "!bound": "server",
    "file_name": "string",
    "image_data": "string",
    "unknown2": "string"
  },
  "%container,packet_modal_form_request,": {
    "!id": 100,
    "!bound": "client",
    "form_id": "varint",
    "data": "string"
  },
  "%container,packet_modal_form_response,": {
    "!id": 101,
    "!bound": "server",
    "form_id": "varint",
    "data": "string"
  },
  "%container,packet_server_settings_request,": {
    "!id": 102,
    "!bound": "server"
  },
  "%container,packet_server_settings_response,": {
    "!id": 103,
    "!bound": "client",
    "form_id": "varint",
    "data": "string"
  },
  "%container,packet_show_profile,": {
    "!id": 104,
    "!bound": "client",
    "xuid": "string"
  },
  "!comment,3776": "SetDefaultGameType is sent by the client when it toggles the default game type in the settings UI, and is\nsent by the server when it actually changes the default game type, resulting in the toggle being changed\n",
  "!comment,3778": "in the settings UI.\n",
  "%container,packet_set_default_game_type,": {
    "!id": 105,
    "!bound": "client",
    "!comment,3782": "GameType is the new game type that is set. When sent by the client, this is the requested new default\ngame type.\n",
    "gamemode": "GameMode"
  },
  "%container,packet_remove_objective,": {
    "!id": 106,
    "!bound": "client",
    "objective_name": "string"
  },
  "%container,packet_set_display_objective,": {
    "!id": 107,
    "!bound": "client",
    "display_slot": "string",
    "objective_name": "string",
    "display_name": "string",
    "criteria_name": "string",
    "sort_order": "zigzag32"
  },
  "%container,packet_set_score,": {
    "!id": 108,
    "!bound": "client",
    "entries": "ScoreEntries"
  },
  "%container,packet_lab_table,": {
    "!id": 109,
    "!bound": "both",
    "useless_byte": "u8",
    "lab_table_x": "varint",
    "lab_table_y": "varint",
    "lab_table_z": "varint",
    "reaction_type": "u8"
  },
  "!comment,3814": "UpdateBlockSynced is sent by the server to synchronise the falling of a falling block entity with the\ntransitioning back and forth from and to a solid block. It is used to prevent the entity from flickering,\n",
  "!comment,3816": "and is used in places such as the pushing of blocks with pistons.\n",
  "%container,packet_update_block_synced,": {
    "!id": 110,
    "!bound": "client",
    "!comment,3820": "Position is the block position at which a block is updated.\n",
    "position": "BlockCoordinates",
    "!comment,3822": "NewBlockRuntimeID is the runtime ID of the block that is placed at Position after sending the packet\nto the client.\n",
    "block_runtime_id": "varint",
    "!comment,3825": "Flags is a combination of flags that specify the way the block is updated client-side. It is a\ncombination of the flags above, but typically sending only the BlockUpdateNetwork flag is sufficient.\n",
    "flags": "UpdateBlockFlags",
    "!comment,3828": "Layer is the world layer on which the block is updated. For most blocks, this is the first layer, as\nthat layer is the default layer to place blocks on, but for blocks inside of each other, this differs.\n",
    "layer": "varint",
    "!comment,3831": "EntityUniqueID is the unique ID of the falling block entity that the block transitions to or that the\nentity transitions from.\n",
    "!comment,3833": "Note that for both possible values for TransitionType, the EntityUniqueID should point to the falling\nblock entity involved.\n",
    "entity_unique_id": "zigzag64",
    "!comment,3836": "TransitionType is the type of the transition that happened. It is either BlockToEntityTransition, when\na block placed becomes a falling entity, or EntityToBlockTransition, when a falling entity hits the\n",
    "!comment,3838": "ground and becomes a solid block again.\n",
    "%map,transition_type,varint64": {
      "!comment,3840": "For falling sand, when a sand turns to an entity\n",
      "%n,0": "entity",
      "!comment,3842": "When sand turns back to a new block\n",
      "%n,1": "create",
      "%n,2": "destroy"
    }
  },
  "!comment,3847": "MoveActorDelta is sent by the server to move an entity. The packet is specifically optimised to save as\nmuch space as possible, by only writing non-zero fields.\n",
  "!comment,3849": "As of 1.16.100, this packet no longer actually contains any deltas.\n",
  "%container,packet_move_entity_delta,": {
    "!id": 111,
    "!bound": "client",
    "!comment,3853": "EntityRuntimeID is the runtime ID of the entity that is being moved. The packet works provided a\nnon-player entity with this runtime ID is present.\n",
    "runtime_entity_id": "varint64",
    "!comment,3856": "Flags is a list of flags that specify what data is in the packet.\n",
    "flags": "DeltaMoveFlags",
    "%switch,x,flags.has_x": {
      "if true": "lf32"
    },
    "%switch,y,flags.has_y": {
      "if true": "lf32"
    },
    "%switch,z,flags.has_z": {
      "if true": "lf32"
    },
    "%switch,rot_x,flags.has_rot_x": {
      "if true": "u8"
    },
    "%switch,rot_y,flags.has_rot_y": {
      "if true": "u8"
    },
    "%switch,rot_z,flags.has_rot_z": {
      "if true": "u8"
    }
  },
  "DeltaMoveFlags": [
    "bitflags",
    {
      "type": "lu16",
      "flags": {
        "has_x": 1,
        "has_y": 2,
        "has_z": 4,
        "has_rot_x": 8,
        "has_rot_y": 16,
        "has_rot_z": 32,
        "on_ground": 64,
        "teleport": 128,
        "force_move": 256
      }
    }
  ],
  "%container,packet_set_scoreboard_identity,": {
    "!id": 112,
    "!bound": "client",
    "entries": "ScoreboardIdentityEntries"
  },
  "!comment,3893": "SetLocalPlayerAsInitialised is sent by the client in response to a PlayStatus packet with the status set\nto spawn. The packet marks the moment at which the client is fully initialised and can receive any packet\n",
  "!comment,3895": "without discarding it.\n",
  "%container,packet_set_local_player_as_initialized,": {
    "!id": 113,
    "!bound": "server",
    "!comment,3899": "EntityRuntimeID is the entity runtime ID the player was assigned earlier in the login sequence in the\nStartGame packet.\n",
    "runtime_entity_id": "varint64"
  },
  "%container,packet_update_soft_enum,": {
    "!id": 114,
    "!bound": "client"
  },
  "%container,packet_network_stack_latency,": {
    "!id": 115,
    "!bound": "both",
    "timestamp": "lu64",
    "unknown_flag": "u8"
  },
  "%container,packet_script_custom_event,": {
    "!id": 117,
    "!bound": "both",
    "event_name": "string",
    "event_data": "string"
  },
  "%container,packet_spawn_particle_effect,": {
    "!id": 118,
    "!bound": "client",
    "dimension_id": "u8",
    "entity_id": "zigzag64",
    "position": "vec3f",
    "particle_name": "string"
  },
  "%container,packet_available_entity_identifiers,": {
    "!id": 119,
    "!bound": "client",
    "nbt": "nbt"
  },
  "%container,packet_level_sound_event_v2,": {
    "!id": 120,
    "!bound": "both",
    "sound_id": "u8",
    "position": "vec3f",
    "block_id": "zigzag32",
    "entity_type": "string",
    "is_baby_mob": "bool",
    "is_global": "bool"
  },
  "%container,packet_network_chunk_publisher_update,": {
    "!id": 121,
    "!bound": "client",
    "coordinates": "BlockCoordinates",
    "radius": "varint"
  },
  "%container,packet_biome_definition_list,": {
    "!id": 122,
    "!bound": "client",
    "nbt": "nbt"
  },
  "!comment,3953": "LevelSoundEvent is sent by the server to make any kind of built-in sound heard to a player. It is sent to,\nfor example, play a stepping sound or a shear sound. The packet is also sent by the client, in which case\n",
  "!comment,3955": "it could be forwarded by the server to the other players online. If possible, the packets from the client\nshould be ignored however, and the server should play them on its own accord.\n",
  "%container,packet_level_sound_event,": {
    "!id": 123,
    "!bound": "both",
    "sound_id": "SoundType",
    "position": "vec3f",
    "block_id": "zigzag32",
    "entity_type": "string",
    "is_baby_mob": "bool",
    "is_global": "bool"
  },
  "!comment,3967": "LevelEventGeneric is sent by the server to send a 'generic' level event to the client. This packet sends an\nNBT serialised object and may for that reason be used for any event holding additional data.\n",
  "%container,packet_level_event_generic,": {
    "!id": 124,
    "!bound": "client",
    "!comment,3972": "EventID is a unique identifier that identifies the event called. The data that follows has fields in\nthe NBT depending on what event it is.\n",
    "event_id": "varint",
    "!comment,3975": "SerialisedEventData is a network little endian serialised object of event data, with fields that vary\ndepending on EventID.\n",
    "!comment,3977": "Unlike many other NBT structures, this data is not actually in a compound but just loosely floating\nNBT tags. To decode using the nbt package, you would need to append 0x0a00 at the start (compound id\n",
    "!comment,3979": "and name length) and add 0x00 at the end, to manually wrap it in a compound. Likewise, you would have\nto remove these bytes when encoding.\n",
    "nbt": "nbtLoop"
  },
  "!comment,3983": "LecternUpdate is sent by the client to update the server on which page was opened in a book on a lectern,\nor if the book should be removed from it.\n",
  "%container,packet_lectern_update,": {
    "!id": 125,
    "!bound": "client",
    "!comment,3988": "Page is the page number in the book that was opened by the player on the lectern.\n",
    "page": "u8",
    "!comment,3990": "PageCount is the number of pages that the book opened in the lectern has.\n",
    "page_count": "u8",
    "!comment,3992": "Position is the position of the lectern that was updated. If no lectern is at the block position,\nthe packet should be ignored.\n",
    "position": "vec3i",
    "!comment,3995": "DropBook specifies if the book currently set on display in the lectern should be dropped server-side.\n",
    "drop_book": "bool"
  },
  "%container,packet_video_stream_connect,": {
    "!id": 126,
    "!bound": "client",
    "server_uri": "string",
    "frame_send_frequency": "lf32",
    "action": "u8",
    "resolution_x": "li32",
    "resolution_y": "li32"
  },
  "!comment,4007": "This is NOT a Minecraft entity, but an entity in the Entity Component System (ECS)\nfor the game engine Minecrat Bedrock uses. Internally, all 'Minecraft entities' are\n",
  "!comment,4009": "known as Actors including in packet names and fields. However, these are irrelevant\ninternal details so we don't do the renames in these protocol definitions, for simplicity we just use Entity.\n",
  "!comment,4011": "\nAddEntity is sent by the server to the client. Its function is not entirely clear: It does not add an\n",
  "!comment,4013": "entity in the sense of an in-game entity, but has to do with the ECS that Minecraft uses.\n",
  "%container,packet_add_ecs_entity,": {
    "!id": 127,
    "!bound": "client",
    "!comment,4017": "EntityNetworkID is the network ID of the entity that should be added.\n",
    "network_id": "varint64"
  },
  "!comment,4020": "RemoveEntity is sent by the server to the client. Its function is not entirely clear: It does not remove an\nentity in the sense of an in-game entity, but has to do with the ECS that Minecraft uses\n",
  "%container,packet_remove_ecs_entity,": {
    "!id": 128,
    "!bound": "client",
    "!comment,4025": "EntityNetworkID is the network ID of the entity that should be removed.\n",
    "network_id": "varint64"
  },
  "%container,packet_client_cache_status,": {
    "!id": 129,
    "!bound": "both",
    "enabled": "bool"
  },
  "%container,packet_on_screen_texture_animation,": {
    "!id": 130,
    "!bound": "client"
  },
  "%container,packet_map_create_locked_copy,": {
    "!id": 131,
    "!bound": "client"
  },
  "%container,packet_structure_template_data_export_request,": {
    "!id": 132,
    "!bound": "client"
  },
  "%container,packet_structure_template_data_export_response,": {
    "!id": 133,
    "!bound": "client"
  },
  "%container,packet_update_block_properties,": {
    "!id": 134,
    "!bound": "client",
    "nbt": "nbt"
  },
  "!comment,4054": "ClientCacheBlobStatus is part of the blob cache protocol. It is sent by the client to let the server know\nwhat blobs it needs and which blobs it already has, in an ACK type system.\n",
  "%container,packet_client_cache_blob_status,": {
    "!id": 135,
    "!bound": "client",
    "!comment,4059": "The number of MISSes in this packet\n",
    "misses": "varint",
    "!comment,4061": "The number of HITs in this packet\n",
    "haves": "varint",
    "!comment,4063": "A list of blob hashes that the client does not have a blob available for. The server\nshould send the blobs matching these hashes as soon as possible.\n",
    "%array,missing,lu64,$misses": null,
    "!comment,4066": "A list of hashes that the client does have a cached blob for. Server doesn't need to send.\n",
    "%array,have,lu64,$haves": null
  },
  "!comment,4069": "ClientCacheMissResponse is part of the blob cache protocol. It is sent by the server in response to a\nClientCacheBlobStatus packet and contains the blob data of all blobs that the client acknowledged not to\n",
  "!comment,4071": "have yet.\n",
  "%container,packet_client_cache_miss_response,": {
    "!id": 136,
    "!bound": "client",
    "%array,blobs,Blob,varint": null
  },
  "!comment,4077": "EducationSettings is a packet sent by the server to update Minecraft: Education Edition related settings.\nIt is unused by the normal base game.\n",
  "%container,packet_education_settings,": {
    "!id": 137,
    "!bound": "client",
    "!comment,4082": "CodeBuilderDefaultURI is the default URI that the code builder is ran on. Using this, a Code Builder\nprogram can make code directly affect the server.\n",
    "CodeBuilderDefaultURI": "string",
    "!comment,4085": "CodeBuilderTitle is the title of the code builder shown when connected to the CodeBuilderDefaultURI.\n",
    "CodeBuilderTitle": "string",
    "!comment,4087": "CanResizeCodeBuilder specifies if clients connected to the world should be able to resize the code\nbuilder when it is opened.\n",
    "CanResizeCodeBuilder": "bool",
    "HasOverrideURI": "bool",
    "%switch,OverrideURI,HasOverrideURI": {
      "if true": "string"
    },
    "!comment,4093": "HasQuiz specifies if the world has a quiz connected to it.\n",
    "HasQuiz": "bool"
  },
  "!comment,4096": "MultiPlayerSettings is sent by the client to update multi-player related settings server-side and sent back\nto online players by the server.\n",
  "!comment,4098": "The MultiPlayerSettings packet is a Minecraft: Education Edition packet. It has no functionality for the\nbase game.\n",
  "%container,packet_multiplayer_settings,": {
    "!id": 139,
    "!bound": "server",
    "!comment,4103": "ActionType is the action that should be done when this packet is sent. It is one of the constants that\nmay be found above.\n",
    "%map,action_type,zigzag32": {
      "%n,0": "enable_multiplayer",
      "%n,1": "disable_multiplayer",
      "%n,2": "refresh_join_code"
    }
  },
  "!comment,4110": "SettingsCommand is sent by the client when it changes a setting in the settings that results in the issuing\nof a command to the server, such as when Show Coordinates is enabled.\n",
  "%container,packet_settings_command,": {
    "!id": 140,
    "!bound": "server",
    "!comment,4115": "CommandLine is the full command line that was sent to the server as a result of the setting that the\nclient changed.\n",
    "command_line": "string",
    "!comment,4118": "SuppressOutput specifies if the client requests the suppressing of the output of the command that was\nexecuted. Generally this is set to true, as the client won't need a message to confirm the output of\n",
    "!comment,4120": "the change.\n",
    "suppress_output": "bool"
  },
  "!comment,4123": "AnvilDamage is sent by the client to request the dealing damage to an anvil. This packet is completely\npointless and the server should never listen to it.\n",
  "%container,packet_anvil_damage,": {
    "!id": 141,
    "!bound": "server",
    "!comment,4128": "Damage is the damage that the client requests to be dealt to the anvil.\n",
    "damage": "u8",
    "!comment,4130": "AnvilPosition is the position in the world that the anvil can be found at.\n",
    "position": "BlockCoordinates"
  },
  "!comment,4133": "CompletedUsingItem is sent by the server to tell the client that it should be done using the item it is\ncurrently using.\n",
  "%container,packet_completed_using_item,": {
    "!id": 142,
    "!bound": "client",
    "!comment,4138": "UsedItemID is the item ID of the item that the client completed using. This should typically be the\nID of the item held in the hand.\n",
    "used_item_id": "li16",
    "!comment,4141": "UseMethod is the method of the using of the item that was completed. It is one of the constants that\nmay be found above.\n",
    "%map,use_method,li32": {
      "%n,0": "equip_armor",
      "%n,1": "eat",
      "%n,2": "attack",
      "%n,3": "consume",
      "%n,4": "throw",
      "%n,5": "shoot",
      "%n,6": "place",
      "%n,7": "fill_bottle",
      "%n,8": "fill_bucket",
      "%n,9": "pour_bucket",
      "%n,10": "use_tool",
      "%n,11": "interact",
      "%n,12": "retrieved",
      "%n,13": "dyed",
      "%n,14": "traded"
    }
  },
  "!comment,4160": "NetworkSettings is sent by the server to update a variety of network settings. These settings modify the\nway packets are sent over the network stack.\n",
  "%container,packet_network_settings,": {
    "!id": 143,
    "!bound": "both",
    "!comment,4165": "CompressionThreshold is the minimum size of a packet that is compressed when sent. If the size of a\npacket is under this value, it is not compressed.\n",
    "!comment,4167": "When set to 0, all packets will be left uncompressed.\n",
    "compression_threshold": "u16"
  },
  "!comment,4171": "PlayerAuthInput is sent by the client to allow for server authoritative movement. It is used to synchronise\nthe player input with the position server-side.\n",
  "!comment,4173": "The client sends this packet when the ServerAuthoritativeMovementMode field in the StartGame packet is set\nto true, instead of the MovePlayer packet. The client will send this packet once every tick.\n",
  "%container,packet_player_auth_input,": {
    "!id": 144,
    "!bound": "server",
    "!comment,4178": "Pitch that the player reports it has.\n",
    "pitch": "lf32",
    "!comment,4180": "Yaw that player reports it has.\n",
    "yaw": "lf32",
    "!comment,4182": "Position holds the position that the player reports it has.\n",
    "position": "vec3f",
    "!comment,4184": "MoveVector is a Vec2 that specifies the direction in which the player moved, as a combination of X/Z\nvalues which are created using the WASD/controller stick state.\n",
    "move_vector": "vec2f",
    "!comment,4187": "HeadYaw is the horizontal rotation of the head that the player reports it has.\n",
    "head_yaw": "lf32",
    "!comment,4189": "InputData is a combination of bit flags that together specify the way the player moved last tick. It\nis a combination of the flags above.\n",
    "input_data": "InputFlag",
    "!comment,4192": "InputMode specifies the way that the client inputs data to the screen. It is one of the constants that\nmay be found above.\n",
    "%map,input_mode,varint": {
      "%n,0": "unknown",
      "%n,1": "mouse",
      "%n,2": "touch",
      "%n,3": "game_pad",
      "%n,4": "motion_controller"
    },
    "!comment,4200": "PlayMode specifies the way that the player is playing. The values it holds, which are rather random,\nmay be found above.\n",
    "%map,play_mode,varint": {
      "%n,0": "normal",
      "%n,1": "teaser",
      "%n,2": "screen",
      "%n,3": "viewer",
      "%n,4": "reality",
      "%n,5": "placement",
      "%n,6": "living_room",
      "%n,7": "exit_level",
      "%n,8": "exit_level_living_room",
      "%n,9": "num_modes"
    },
    "!comment,4213": "GazeDirection is the direction in which the player is gazing, when the PlayMode is PlayModeReality: In\nother words, when the player is playing in virtual reality.\n",
    "%switch,gaze_direction,play_mode": {
      "if reality": "vec3f"
    },
    "!comment,4217": "Tick is the server tick at which the packet was sent. It is used in relation to\nCorrectPlayerMovePrediction.\n",
    "tick": "varint64",
    "!comment,4220": "Delta was the delta between the old and the new position. There isn't any practical use for this field\nas it can be calculated by the server itself.\n",
    "delta": "vec3f",
    "%switch,transaction,input_data.item_interact": {
      "if true": {
        "legacy": "TransactionLegacy",
        "actions": "TransactionActions",
        "data": "TransactionUseItem"
      }
    },
    "%switch,item_stack_request,input_data.item_stack_request": {
      "if true": "ItemStackRequest"
    },
    "%switch,block_action,input_data.block_action": {
      "%array,if true,,zigzag32": {
        "action": "Action",
        "%switch,__4233,action": {
          "if start_break or abort_break or crack_break or predict_break or continue_break": {
            "!comment,4235": "BlockPosition is the position of the target block, if the action with the ActionType set concerned a\nblock. If that is not the case, the block position will be zero.\n",
            "position": "BlockCoordinates",
            "!comment,4238": "BlockFace is the face of the target block that was touched. If the action with the ActionType set\nconcerned a block. If not, the face is always 0.\n",
            "face": "zigzag32"
          }
        }
      }
    }
  },
  "InputFlag": [
    "bitflags",
    {
      "type": "varint64",
      "big": true,
      "flags": [
        "ascend",
        "descend",
        "north_jump",
        "jump_down",
        "sprint_down",
        "change_height",
        "jumping",
        "auto_jumping_in_water",
        "sneaking",
        "sneak_down",
        "up",
        "down",
        "left",
        "right",
        "up_left",
        "up_right",
        "want_up",
        "want_down",
        "want_down_slow",
        "want_up_slow",
        "sprinting",
        "ascend_scaffolding",
        "descend_scaffolding",
        "sneak_toggle_down",
        "persist_sneak",
        "start_sprinting",
        "stop_sprinting",
        "start_sneaking",
        "stop_sneaking",
        "start_swimming",
        "stop_swimming",
        "start_jumping",
        "start_gliding",
        "stop_gliding",
        "item_interact",
        "block_action",
        "item_stack_request"
      ]
    }
  ],
  "%container,packet_creative_content,": {
    "!id": 145,
    "!bound": "client",
    "%array,items,,varint": {
      "entry_id": "varint",
      "item": "ItemLegacy"
    }
  },
  "%container,packet_player_enchant_options,": {
    "!id": 146,
    "!bound": "client",
    "enchant_options": "EnchantOptions"
  },
  "!comment,4298": "ItemStackRequest is sent by the client to change item stacks in an inventory. It is essentially a\nreplacement of the InventoryTransaction packet added in 1.16 for inventory specific actions, such as moving\n",
  "!comment,4300": "items around or crafting. The InventoryTransaction packet is still used for actions such as placing blocks\nand interacting with entities.\n",
  "%container,packet_item_stack_request,": {
    "!id": 147,
    "!bound": "server",
    "%array,requests,ItemStackRequest,varint": null
  },
  "%container,packet_item_stack_response,": {
    "!id": 148,
    "!bound": "client",
    "responses": "ItemStackResponses"
  },
  "!comment,4312": "PlayerArmourDamage is sent by the server to damage the armour of a player. It is a very efficient packet,\nbut generally it's much easier to just send a slot update for the damaged armour.\n",
  "%container,packet_player_armor_damage,": {
    "!id": 149,
    "!bound": "client",
    "!comment,4317": "Bitset holds a bitset of 4 bits that indicate which pieces of armour need to have damage dealt to them.\nThe first bit, when toggled, is for a helmet, the second for the chestplate, the third for the leggings\n",
    "!comment,4319": "and the fourth for boots.\n",
    "type": "ArmorDamageType",
    "%switch,helmet_damage,type.head": {
      "if true": "zigzag32"
    },
    "%switch,chestplate_damage,type.chest": {
      "if true": "zigzag32"
    },
    "%switch,leggings_damage,type.legs": {
      "if true": "zigzag32"
    },
    "%switch,boots_damage,type.feet": {
      "if true": "zigzag32"
    }
  },
  "ArmorDamageType": [
    "bitflags",
    {
      "type": "u8",
      "flags": {
        "head": 1,
        "chest": 2,
        "legs": 4,
        "feet": 8
      }
    }
  ],
  "!comment,4342": "UpdatePlayerGameType is sent by the server to change the game mode of a player. It is functionally\nidentical to the SetPlayerGameType packet.\n",
  "%container,packet_update_player_game_type,": {
    "!id": 151,
    "!bound": "server",
    "!comment,4347": "GameType is the new game type of the player. It is one of the constants that can be found in\nset_player_game_type.go. Some of these game types require additional flags to be set in an\n",
    "!comment,4349": "AdventureSettings packet for the game mode to obtain its full functionality.\n",
    "gamemode": "GameMode",
    "!comment,4351": "PlayerUniqueID is the entity unique ID of the player that should have its game mode updated. If this\npacket is sent to other clients with the player unique ID of another player, nothing happens.\n",
    "player_unique_id": "zigzag64"
  },
  "!comment,4356": "PositionTrackingDBClientRequest is a packet sent by the client to request the position and dimension of a\n'tracking ID'. These IDs are tracked in a database by the server. In 1.16, this is used for lodestones.\n",
  "!comment,4358": "The client will send this request to find the position a lodestone compass needs to point to. If found, it\nwill point to the lodestone. If not, it will start spinning around.\n",
  "!comment,4360": "A PositionTrackingDBServerBroadcast packet should be sent in response to this packet.\n",
  "%container,packet_position_tracking_db_request,": {
    "!id": 154,
    "!bound": "server",
    "!comment,4364": "RequestAction is the action that should be performed upon the receiving of the packet. It is one of the\nconstants found above.\n",
    "%map,action,u8": {
      "%n,0": "query"
    },
    "!comment,4368": "TrackingID is a unique ID used to identify the request. The server responds with a\nPositionTrackingDBServerBroadcast packet holding the same ID, so that the client can find out what that\n",
    "!comment,4370": "packet was in response to.\n",
    "tracking_id": "zigzag32"
  },
  "!comment,4373": "PositionTrackingDBServerBroadcast is sent by the server in response to the\nPositionTrackingDBClientRequest packet. This packet is, as of 1.16, currently only used for lodestones. The\n",
  "!comment,4375": "server maintains a database with tracking IDs and their position and dimension. The client will request\nthese tracking IDs, (NBT tag set on the lodestone compass with the tracking ID?) and the server will\n",
  "!comment,4377": "respond with the status of those tracking IDs.\nWhat is actually done with the data sent depends on what the client chooses to do with it. For the\n",
  "!comment,4379": "lodestone compass, it is used to make the compass point towards lodestones and to make it spin if the\nlodestone at a position is no longer there.\n",
  "%container,packet_position_tracking_db_broadcast,": {
    "!id": 153,
    "!bound": "client",
    "!comment,4384": "BroadcastAction specifies the status of the position tracking DB response. It is one of the constants\nabove, specifying the result of the request with the ID below.\n",
    "!comment,4386": "The Update action is sent for setting the position of a lodestone compass, the Destroy and NotFound to\nindicate that there is not (no longer) a lodestone at that position.\n",
    "%map,broadcast_action,u8": {
      "%n,0": "update",
      "%n,1": "destory",
      "%n,2": "not_found"
    },
    "!comment,4392": "TrackingID is the ID of the PositionTrackingDBClientRequest packet that this packet was in response to.\nThe tracking ID is also present as the 'id' field in the SerialisedData field.\n",
    "tracking_id": "zigzag32",
    "nbt": "nbt"
  },
  "!comment,4397": "PacketViolationWarning is sent by the client when it receives an invalid packet from the server. It holds\nsome information on the error that occurred.\n",
  "%container,packet_packet_violation_warning,": {
    "!id": 156,
    "!bound": "server",
    "%map,violation_type,zigzag32": {
      "%n,0": "malformed"
    },
    "!comment,4404": "Severity specifies the severity of the packet violation. The action the client takes after this\nviolation depends on the severity sent.\n",
    "%map,severity,zigzag32": {
      "%n,0": "warning",
      "%n,1": "final_warning",
      "%n,2": "terminating"
    },
    "!comment,4410": "PacketID is the ID of the invalid packet that was received.\n",
    "packet_id": "zigzag32",
    "!comment,4412": "ViolationContext holds a description on the violation of the packet.\n",
    "reason": "string"
  },
  "!comment,4416": "MotionPredictionHints is sent by the server to the client. There is a predictive movement component for\nentities. This packet fills the \"history\" of that component and entity movement is computed based on the\n",
  "!comment,4418": "points. Vanilla sends this packet instead of the SetActorMotion packet when 'spatial optimisations' are\nenabled.\n",
  "%container,packet_motion_prediction_hints,": {
    "!id": 157,
    "!bound": "client",
    "!comment,4423": "EntityRuntimeID is the runtime ID of the entity whose velocity is sent to the client.\n",
    "entity_runtime_id": "varint64",
    "!comment,4425": "Velocity is the server-calculated velocity of the entity at the point of sending the packet.\n",
    "velocity": "vec3f",
    "!comment,4427": "OnGround specifies if the server currently thinks the entity is on the ground.\n",
    "on_ground": "bool"
  },
  "!comment,4431": "AnimateEntity is sent by the server to animate an entity client-side. It may be used to play a single\nanimation, or to activate a controller which can start a sequence of animations based on different\n",
  "!comment,4433": "conditions specified in an animation controller.\nMuch of the documentation of this packet can be found at\n",
  "!comment,4435": "https://minecraft.gamepedia.com/Bedrock_Edition_beta_animation_documentation.\n",
  "%container,packet_animate_entity,": {
    "!id": 158,
    "!bound": "client",
    "!comment,4439": "Animation is the name of a single animation to start playing.\n",
    "animation": "string",
    "!comment,4441": "NextState is the first state to start with. These states are declared in animation controllers (which,\nin themselves, are animations too). These states in turn may have animations and transitions to move to\n",
    "!comment,4443": "a next state.\n",
    "next_state": "string",
    "!comment,4445": "StopCondition is a MoLang expression that specifies when the animation should be stopped.\n",
    "stop_condition": "string",
    "!comment,4447": "Controller is the animation controller that is used to manage animations. These controllers decide when\nto play which animation.\n",
    "controller": "string",
    "!comment,4450": "How long to move from the previous animation to the next.\n",
    "blend_out_time": "lf32",
    "!comment,4452": "EntityRuntimeIDs is list of runtime IDs of entities that the animation should be applied to.\n",
    "%array,runtime_entity_ids,varint64,varint": null
  },
  "!comment,4455": "CameraShake is sent by the server to make the camera shake client-side. This feature was added for map-\nmaking partners.\n",
  "%container,packet_camera_shake,": {
    "!id": 159,
    "!bound": "client",
    "!comment,4460": "Intensity is the intensity of the shaking. The client limits this value to 4, so anything higher may\nnot work.\n",
    "intensity": "lf32",
    "!comment,4463": "Duration is the number of seconds the camera will shake for.\n",
    "duration": "lf32",
    "!comment,4465": "Type is the type of shake, and is one of the constants listed above. The different type affects how\nthe shake looks in game.\n",
    "type": "u8",
    "!comment,4468": "Action is the action to be performed, and is one of the constants listed above. Currently the\ndifferent actions will either add or stop shaking the client.\n",
    "%map,action,u8": {
      "%n,0": "add",
      "%n,1": "stop"
    }
  },
  "!comment,4474": "PlayerFog is sent by the server to render the different fogs in the Stack. The types of fog are controlled\nby resource packs to change how they are rendered, and the ability to create custom fog.\n",
  "%container,packet_player_fog,": {
    "!id": 160,
    "!bound": "client",
    "!comment,4479": "Stack is a list of fog identifiers to be sent to the client. Examples of fog identifiers are\n\"minecraft:fog_ocean\" and \"minecraft:fog_hell\".\n",
    "%array,stack,string,varint": null
  },
  "!comment,4484": "CorrectPlayerMovePrediction is sent by the server if and only if StartGame.ServerAuthoritativeMovementMode\nis set to AuthoritativeMovementModeServerWithRewind. The packet is used to correct movement at a specific\n",
  "!comment,4486": "point in time.\n",
  "%container,packet_correct_player_move_prediction,": {
    "!id": 161,
    "!bound": "client",
    "!comment,4490": "Position is the position that the player is supposed to be at at the tick written in the field below.\nThe client will change its current position based on movement after that tick starting from the\n",
    "!comment,4492": "Position.\n",
    "position": "vec3f",
    "!comment,4494": "Delta is the change in position compared to what the client sent as its position at that specific tick.\n",
    "delta": "vec3f",
    "!comment,4496": "OnGround specifies if the player was on the ground at the time of the tick below.\n",
    "on_ground": "bool",
    "!comment,4498": "Tick is the tick of the movement which was corrected by this packet.\n",
    "tick": "varint64"
  },
  "!comment,4501": "ItemComponent is sent by the server to attach client-side components to a custom item.\n",
  "%container,packet_item_component,": {
    "!id": 162,
    "!bound": "client",
    "!comment,4505": "`entries` holds a list of all custom items with their respective components set.\n",
    "entries": "ItemComponentList"
  },
  "!comment,4508": "FilterText is sent by the both the client and the server. The client sends the packet to the server to\nallow the server to filter the text server-side. The server then responds with the same packet and the\n",
  "!comment,4510": "safer version of the text.\n",
  "%container,packet_filter_text_packet,": {
    "!id": 163,
    "!bound": "client",
    "!comment,4514": "Text is either the text from the client or the safer version of the text sent by the server.\n",
    "text": "string",
    "!comment,4516": "FromServer indicates if the packet was sent by the server or not.\n",
    "from_server": "bool"
  },
  "!comment,4519": "ClientBoundDebugRenderer is sent by the server to spawn an outlined cube on client-side.\n",
  "%container,packet_debug_renderer,": {
    "!id": 164,
    "!bound": "client",
    "!comment,4523": "Type is the type of action. It is one of the constants above.\n",
    "%map,type,li32": {
      "%n,1": "clear",
      "%n,2": "add_cube"
    },
    "%switch,__4527,type": {
      "if clear": "void",
      "if add_cube": {
        "!comment,4530": "Text is the text that is displayed above the debug.\n",
        "text": "string",
        "!comment,4532": "Position is the position to spawn the debug on.\n",
        "position": "vec3f",
        "!comment,4534": "Red is the red value from the RGBA colour rendered on the debug.\n",
        "red": "lf32",
        "!comment,4536": "Green is the green value from the RGBA colour rendered on the debug.\n",
        "green": "lf32",
        "!comment,4538": "Blue is the blue value from the RGBA colour rendered on the debug.\n",
        "blue": "lf32",
        "!comment,4540": "Alpha is the alpha value from the RGBA colour rendered on the debug.\n",
        "alpha": "lf32",
        "!comment,4542": "Duration is how long the debug will last in the world for. It is measured in milliseconds.\n",
        "duration": "li64"
      }
    }
  }
}

function recurse(obj) {

}
// <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-wEmeIV1mKuiNpC+IOBjI7aAzPcEZeedi5yW5f2yOq55WWLwNGmvvx4Um1vskeMj0" crossorigin="anonymous">
/*<style>td{vertical-align:middle;}table{padding:8px;margin-bottom:0!important;}
tr {
  border-right-width: 0!important;
  border-left-width: 0!important;
}
</style>*/
let rows = `
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-wEmeIV1mKuiNpC+IOBjI7aAzPcEZeedi5yW5f2yOq55WWLwNGmvvx4Um1vskeMj0" crossorigin="anonymous">

<style>
body{font-family:sans-serif;}
td{padding:8px;}
table {
  /*width: 100%;*/
}
tr{
  /*width:100%;*/
}
td{
  border-bottom:1px solid #E0E0E0;
}
.bordered td {
  border-right: 1px solid #E0E0E0;
}
.field-name { font-weight:bold;}
.fake{font-weight:normal;font-style:italic;}
</style>
<style>
body { font-family: Helvetica, Arial, sans-serif; }
.packet-header div { display: inline-block; padding: 8px; }
.packet-name { font-size: 22px; font-weight: bold; vertical-align:middle; }
.packet-id { 
  border-radius: 20px; 
  font-size: 14px;
  font-weight: 700;
  min-width: 80px;
  padding: 6px 15px;
  text-align: center;
  border-radius: 3px;
}
.datatype { background-color: #941c9f; color:white; }
.client { background-color: #61affe; color:white; }
.both { background-color: #49cc90; color:white; }
.server { background-color: #597794; color:white; }
.tag { border-radius: 10px; margin: 4px; padding: 2px 4px 2px 4px; background-color: lightblue; background-color: black; color: white; }
.tag-switch {
  background-color: #F0F0F0; border: 1px solid #A0A0A0; color: black; padding: 6px;
}
.tag-array {
  background-color: navy;
}
.field-title { font-weight: bold; }
td { vertical-align: middle; text-align: center; }
table table {
  margin: -8px;
}
.table-bordered { border: 1px solid #E0E0E0; }
thead td { font-weight: bold; background-color: #E0E0E0; }
a { text-decoration: none; }
.name { text-transform: capitalize; }
</style>
</head>
`

var showdown  = require('showdown')
const converter = new showdown.Converter()
const md = text => converter.makeHtml(text)

const thead = `<thead><tr><td>Field Name</td><td>Field Type</td><td>Notes</td></tr></thead>`

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

const isStatement = key => key.startsWith('if ') || key == 'default'
const tfName = (key, parent) => {
  if (isStatement(key) && (parent?.includes('%switch'))) return `<span class='fake'>${key.replace('if', 'is').replace(/_/g, ' ')}</span>`
  return key.startsWith('_') ? key : key.replace(/_/g, ' ').replace('$', '')
}



async function work() {
  let lastComment = ''
  const nextComment = () => { const c = lastComment; lastComment = null; return md(c?.replace(/\n\n/g, '<br/>\n') || ''); }

  function parseContainer(key, val, depth = 1, parent) {
    const pad = str => str.padStart(depth * 2) + '\n'
    // Ignore comments
    if (key.startsWith('!')) {
      if (key.startsWith('!comment')) lastComment = lastComment ? lastComment + val : val
      return
    }
    if (Array.isArray(val)) return

    if (typeof val === 'object') {
      if (key.startsWith('%switch')) {
        const [_, what, condition] = key.split(',')
        rows += pad(`<tr><td><b class='name'>${what.startsWith('_') ? '🔁' : tfName(what)}</b><br/><br/> <i><div class='tag tag-switch'>if <span class='name'>${tfName(condition)}</span></div></i></td><td colspan=2><table>`)
        for (let k in val) {
          let condition = k.startsWith('%') ? k.split(',')[1] : k
          // rows += pad(`<tr><td>${condition}</td><td><table>`)
          let v = val[k]
          parseContainer(k, v, depth + 1, key)
          // rows += pad(`</table></td></tr>`)
        }
        rows += pad(`</table></td></tr>`)
      } else if (key.startsWith('%container') || key.startsWith('if ')) {
        const name = key.startsWith('%') ? key.split(',')[1] : key
        rows += pad(`<tr><td class='name'>${tfName(name, parent)} </td><td colspan=2 class='bordered'><table>`)
        for (const k in val) {
          let v = val[k]
          parseContainer(k, v, depth + 1, key)
        }
        rows += pad(`</table></td></tr>`)
      } else if (key.startsWith('%map')) {
        const [_, what, type] = key.split(',')
        rows += pad(`<tr><td class='name field-name'>${tfName(what, parent)}</td><td colspan=2>${type} <span class='tag tag-enum'>enum</span><hr/> <table style='width:100%'>`)
        for (const k in val) {
          let v = val[k]
          if (k.startsWith('!')) {
            if (k.startsWith('!comment')) lastComment = lastComment ? lastComment + v : v
            continue
          }
      
          rows += pad(`  <tr><td class='name'>${tfName(k.startsWith('%') ? k.split(',')[1] : k)}</td><td class='name'>${tfName(v)}</td><td>${nextComment()}</td></tr>`)
          // parseContainer(k, v, depth + 1)
        }
        rows += pad(`</table></td></tr>`)
      } else if (key.startsWith('%array')) {
        const [_, what, type, prefix] = key.split(',')
        if (prefix) { // Prepend the length prefix
          if (prefix.startsWith('$'))
            rows += pad(`<tr><td colspan=2><i>Length for <span class='name'>${tfName(what, parent)}</span> below is <b class='name'>${tfName(prefix)}</b> from above</td><td ${ type ? 'rowspan=2' : ''}>${nextComment()}</i></td></tr>`)
          else
            rows += pad(`<tr><td class='field-name'><span class='name'>${tfName(what, parent)}</span> length</td><td>${prefix}</td><td ${ type ? 'rowspan=2' : ''}>${nextComment()}</td></tr>`)
        }
        if (type) { // Inline array
          rows += pad(`<tr><td class='field-name'><span class='name'>${tfName(what, parent)}</span> <div class="tag tag-array">array</div></td><td>${type}</td><td>${nextComment()}</td></tr>`)
        } else {
          rows += pad(`<tr><td class='field-name'><span class='name'>${tfName(what, parent)}</span> <div class="tag tag-array">array</div></td><td colspan=2><table>`)
          for (const k in val) {
            let v = val[k]
            parseContainer(k, v, depth + 1, key)
          }
          rows += pad(`</table></td></tr>`)
        }
      }
      // rows += pad('</td></tr>')
    } else if (typeof val === 'string') {
      rows += pad(`<tr><td class='field-name name'>${tfName(key, parent)}</td><td>${tfType(val)}</td><td>${nextComment()}</td></tr>`)
    }
  }

  rows += `<div class='container'>`

  // Build the TOC

  let listOfTypes = []
  const tfType = type => {
    return listOfTypes.includes(type) ? `<a href="#${type}">${type}</a>` : type
  }

  rows += `<h3>Table of Contents</h3>
  <table class='table table-bordered table-striped' style='width:50%'>
  <thead><tr><td>Key</td><td>Name</td></tr></thead>
  <tbody>
    ${Object.entries(toTransform).map(([k,v]) => { 
      if (k.startsWith('!') && !k.startsWith('%')) return ''
      const [ type, name ] = k.split(',')
      if (!name) return ''
      listOfTypes.push(name)
      return name.startsWith('packet_') ? `<tr><td><a href="#${name}">0x${v['!id'].toString(16)}</a></td><td><a href="#${name}">${name}</a></td></tr>`: `<tr><td><a href="#${name}">Type</a><td class='name'>${tfType(name)}</td></tr>` 
    }).join('\n')}
  </tbody>
  </table><br/><hr/>`


  // Iterate through all the types

  for (const containerId in toTransform) {
    const container = toTransform[containerId]
    if (containerId.startsWith('!')) {
      // Write out the comments not associated with types
      if (containerId.startsWith('!comment')) {
        if (container.trim().startsWith('===')) rows += `<p>${nextComment()}</p>`
        else lastComment = lastComment ? lastComment + container : container
      }
      continue
    }

    const [ _, name ] = containerId.split(',')

    if (!name || !container) continue
    const packetId = container['!id'] || 'Type'
    const bound = container['!bound'] || 'datatype'
    const type = { server: 'Serverbound', client: 'Clientbound', both: 'Bidirectional', datatype: 'Datatype' }[bound]
    
    rows += `
    <div class="packet-header" id="${name}">
    <a href="#${name}"><div class='packet-id ${bound}'>${packetId}</div><div class='packet-name name'>${tfName(name)}</div></a>
      <small style='vertical-align:middle;float:right'>${type}</small>
    </div><br/>
    \n<p>${nextComment()}</p>\n<table class='table-bordered'>${thead}\n`

    if (containerId.startsWith('%container')) { // Inline the container
      Object.entries(container).forEach(([k,v]) => parseContainer(k, v))
    } else {
      parseContainer(containerId, container)
    }

    rows += '</table><br/><hr/><br/>'
  }

  rows += `</div>`

  console.log(rows)
}

work()
