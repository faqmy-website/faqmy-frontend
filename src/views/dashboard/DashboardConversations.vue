<script lang="ts" setup>
import pageTitle from "@/utils/title";
import { onMounted, ref } from "vue";
import conversationResource from "@/resource/conversations/conversation.resource";
import messageResource from "@/resource/message/message.resource";
import type { Message } from "@/resource/message/message";
import type { Conversation } from "@/resource/conversations/conversation";

pageTitle.value = "Conversations";

const conversationList = ref<Conversation[]>([]);
const loading = ref(true);
const messages = ref<Message[]>([]);
const loadingMessages = ref(false);
const activeConversationId = ref<null | string>(null);
const openDialog = ref(false);
const openDialogConversationId = ref<string | null>(null);
const loadingDialog = ref(false);

function selectConversation(cid: string): void {
  activeConversationId.value = cid;
  loadingMessages.value = true;
  messageResource.messages(cid).subscribe((data) => {
    messages.value = data;
    loadingMessages.value = false;
  });
}

function confirmRemove(id: string) {
  openDialog.value = true;
  openDialogConversationId.value = id;
}

function remove() {
  loadingDialog.value = true;
  if (openDialogConversationId.value) {
    conversationResource
      .remove(openDialogConversationId.value)
      .subscribe(() => {
        const cardIndex = conversationList.value.findIndex(
          (item) => item.id === openDialogConversationId.value
        );
        if (cardIndex > -1) {
          conversationList.value.splice(cardIndex, 1);
        }
        openDialog.value = false;
        openDialogConversationId.value = null;
        loadingDialog.value = false;
      });
  }
}

function getConversation() {
  loading.value = true;
  conversationResource.list().subscribe((data) => {
    conversationList.value = data;
    loading.value = false;
    if (data.length) {
      selectConversation(data[0].id);
    }
  });
}

onMounted(() => {
  getConversation();
});
</script>
<template lang="pug">
VRow
  VCol
    VCard(:loading="loading")
      VTable(hover)
        template(v-if="!conversationList.length && !loading", #bottom)
          .text-center.py-4 No result
        thead
          tr
            th.text-left Date Created
            th.text-left Name Stack
            th
        tbody
          tr(
            v-for="item in conversationList",
            :key="item.id",
            :class="{ 'bg-primary': activeConversationId === item.id }",
            @click="selectConversation(item.id)"
          )
            td {{ item.createdAt.toLocaleString() }}
            td {{ item.stack.name }}
            td.action.text-right
              VBtn(
                icon="$trash",
                size="small",
                variant="text",
                title="Delete",
                :color="activeConversationId === item.id ? 'white' : 'primary'",
                @click.stop="confirmRemove(item.id)"
              )

  VCol
    VCard(:loading="loadingMessages", title="Transcript")
      VCardText
        VSheet.my-2(
          v-for="message in messages",
          :key="message.id",
          rounded,
          :color="message.isBot ? 'secondary' : 'primary'",
          :class="[message.isBot ? 'mr-12' : 'ml-12']"
        )
          .pa-3
            div
              span.font-weight-medium {{ message.isBot ? "Bot: " : "Visitor: " }}
              span {{ message.text }}
            .text-caption {{ message.createdAt.toLocaleString() }}
VDialog(v-model="openDialog", max-width="300")
  VCard(
    title="Delete",
    text="Are you sure you want to delete the conversation?"
  )
    VCardActions
      VSpacer
      VBtn(
        variant="text",
        @click="openDialog = false; openDialogConversationId = null"
      ) No
      VBtn(
        variant="text",
        color="error",
        :loading="loadingDialog",
        @click="remove"
      ) Yes
</template>
<style lang="scss" scoped>
tr {
  cursor: pointer;
  .action .v-btn {
    visibility: hidden;
  }

  &:hover {
    .action .v-btn {
      visibility: visible;
    }
  }
}
</style>
