export default {
    data() {
        return {
            items: [],
            query: '',
            current: -1,
            loading: false,
            engine: null,
        }
    },

    computed: {
        hasItems() {
            return this.items.length > 0
        },

        isEmpty() {
            return !this.query
        },

        isDirty() {
            return !!this.query
        }
    },

    methods: {
        update() {
            if (!this.query) {
                return this.reset()
            }

            if (this.minChars && this.query.length < this.minChars) {
                return
            }

            this.loading = true;
            this.search();
        },

        search() {
            if(!this.engine) {
                console.log('You need set Bloodhound engine');
                return;
            }

            this.engine.search(this.query, (response) => {
                if (this.query) {
                    let data = response;
                    data = this.prepareResponseData ? this.prepareResponseData(data) : data
                    this.items = this.limit ? data.slice(0, this.limit) : data
                    this.current = -1
                    this.loading = false
                }
            });
        },

        reset() {
            this.items = []
            this.query = ''
            this.loading = false
        },

        setActive(index) {
            this.current = index
        },

        activeClass(index) {
            return {
                active: this.current === index
            }
        },

        hit() {
            if (this.current !== -1) {
                this.onHit(this.items[this.current])
            }
        },

        up() {
            if (this.current > 0) {
                this.current--
            } else if (this.current === -1) {
                this.current = this.items.length - 1
            } else {
                this.current = -1
            }
        },

        down() {
            if (this.current < this.items.length - 1) {
                this.current++
            } else {
                this.current = -1
            }
        },

        onHit() {
            console.log('You need to implement the `onHit` method')
            return;
        }
    }
}
