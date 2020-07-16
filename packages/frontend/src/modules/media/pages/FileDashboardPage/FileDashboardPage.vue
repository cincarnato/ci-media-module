<template>
    <v-container>
        <v-card>
            <v-card-title>
                {{$t('media.file.dashboardTitle')}}
            </v-card-title>

            <v-card-text>
                <v-row>
                    <v-col cols="12" sm="4" offset-sm="2">
                        <v-card color="blue" dark>
                            <v-row>
                                <v-col cols="3" class="text-center display-1">
                                    <v-icon size="90">loupe</v-icon>
                                </v-col>
                                <v-col cols="9">
                                    <h6 class="text-h6">COUNT</h6>
                                    <h1 class=" text-center text-h3 font-weight-bold">
                                        {{fileGlobalMetrics.count}}
                                    </h1>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-card color="red" dark>
                            <v-row>
                                <v-col cols="3" class="text-center display-1"><v-icon size="90">fitness_center</v-icon></v-col>
                                <v-col cols="9">
                                    <h6 class="text-h6">WEIGHT</h6>
                                    <h1 class=" text-center text-h3 font-weight-bold">
                                        {{redeableBytes(fileGlobalMetrics.weight)}}
                                    </h1>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>


            </v-card-text>
        </v-card>

    </v-container>
</template>

<script>
    import fileMetricsProvider from "../../providers/FileMetricsProvider";
    import redeableBytesMixin from '../../mixins/readableBytesMixin'

    export default {
        name: "FileDashboardPage",
        mixins: [redeableBytesMixin],
        data() {
            return {
                fileGlobalMetrics: null
            }
        },
        created() {
            this.fetchFileGlobalMetrics()
        },
        methods: {
            fetchFileGlobalMetrics() {
                fileMetricsProvider.fileGlobalMetrics().then(r => {
                    this.fileGlobalMetrics = r.data.fileGlobalMetrics
                }).catch(err => {
                    console.error(err)
                })
            }

        }
    }
</script>

<style scoped>

</style>