import {ref, computed} from "vue";
import {defineStore} from "pinia";
import type {AuditionID} from "@/datastore/models/audition/Audition";
import type {Audition} from "@/datastore/models/audition/Audition";

export const useAuditionStore = defineStore("audition", () => {
    const auditionID = ref("" as AuditionID);

    function setCurrentAuditionID(id: AuditionID) {
        auditionID.value = id;
    }

    const audition = ref();

    function setCurrentAudition(aud: Audition) {
        audition.value = aud;
    }

    return {auditionID, setCurrentAuditionID, audition, setCurrentAudition};
});
