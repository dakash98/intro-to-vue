<template>
  <h1>Events for Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <div class="pagination">
      <div class="align-center" v-for="p in getTotalPage()" :key="p">
        <span v-if="p != page">
          <router-link
            :to="{ name: 'EventList', query: { page: p } }"
            :disabled="true"
            @click="isLoading"
            class="add-margin"
          >
            <input type="button" :value="p" />
          </router-link>
        </span>
        <span v-else>
          <input type="button" :value="p" class="disabled" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'

export default {
  name: 'EventList',
  components: {
    EventCard
  },
  props: ['page'],
  data() {
    return {
      events: null,
      totalEvents: 0
    }
  },
  computed: {
    hasNextPage() {
      var totalPages = this.getTotalPage()
      return this.page < totalPages
    }
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    EventService.getEvents(2, parseInt(routeTo.query.page) || 1)
      .then(response => {
        next(comp => {
          comp.events = response.data
          comp.totalEvents = response.headers['x-total-count']
        })
      })
      .catch(() => {
        next({ name: 'NetworkError' })
      })
  },
  beforeRouteUpdate(routeTo) {
    return EventService.getEvents(2, parseInt(routeTo.query.page) || 1)
      .then(response => {
        this.events = response.data
        this.totalEvents = response.headers['x-total-count']
      })
      .catch(() => {
        return { name: 'NetworkError' }
      })
  },
  methods: {
    isLoading() {
      this.showLoader = !this.showLoader
    },
    getTotalPage() {
      return Math.ceil(this.totalEvents / 2)
    }
  }
}
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
}

.pagination {
  display: flex;
  width: 290px;
}

.pagination div {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

.add-margin {
  margin: 0 5px 0 5px;
}

.align-center {
  text-align: center;
}

input[type='button'] {
  background-color: #8eebc1;
  border-width: 0px;
  padding: 5px 15px 5px 15px;
  font-weight: bolder;
}

input[type='button']:hover {
  transform: scale(1.3);
}

.disabled {
  background-color: rgb(54, 53, 53) !important;
  border-width: 0px;
  padding: 5px 15px 5px 15px;
  color: grey;
}
</style>
