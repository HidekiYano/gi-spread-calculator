const calculate = $('#calculate')

calculate.bind('click', event => {
    
    const stat1 = parseInt($('#con-loc').val())
    const stat2 = parseInt($('#pow-vel').val())
    const stat3 = parseInt($('#eye-sta').val())
    const stat4 = parseInt($('#spd-fb').val())
    const stat5 = parseInt($('#fld-brk').val())
    const gi = [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75]
    
    const baseTotal = stat1 + stat2 + stat3 + stat4 + stat5
    const finalStats = []
    
    for(let rep = 0; rep < gi.length; rep++) {
        const stat1Raw = Math.trunc((stat1 - 40)/(baseTotal - 200) * gi[rep])
        const stat2Raw = Math.trunc((stat2 - 40)/(baseTotal - 200) * gi[rep])
        const stat3Raw = Math.trunc((stat3 - 40)/(baseTotal - 200) * gi[rep])
        const stat4Raw = Math.trunc((stat4 - 40)/(baseTotal - 200) * gi[rep])
        const stat5Raw = Math.trunc((stat5 - 40)/(baseTotal - 200) * gi[rep])
        
        var raw = [stat1Raw, stat2Raw, stat3Raw, stat4Raw, stat5Raw]

        function compare(a, b) {
            return a - b;
        }
    
        raw.sort(compare)
        raw.reverse()
    
        const stat1Rank = raw.indexOf(stat1Raw) + 1
        const stat2Rank = raw.indexOf(stat2Raw) + 1
        const stat3Rank = raw.indexOf(stat3Raw) + 1
        const stat4Rank = raw.indexOf(stat4Raw) + 1
        const stat5Rank = raw.indexOf(stat5Raw) + 1
    
        const stat1RankList = [stat1Rank]
        const stat2RankList = [stat1Rank, stat2Rank]
        const stat3RankList = [stat1Rank, stat2Rank, stat3Rank]
        const stat4RankList = [stat1Rank, stat2Rank, stat3Rank, stat4Rank]
        const stat5RankList = [stat1Rank, stat2Rank, stat3Rank, stat4Rank, stat5Rank]

        var stat1Count = 0
        var stat2Count = 0
        var stat3Count = 0
        var stat4Count = 0
        var stat5Count = 0
    
        for(let a = 0; a < stat1RankList.length; a++) {
            if(stat1RankList[a] === stat1Rank) {
                stat1Count++
            }
        }
        
        for(let b = 0; b < stat2RankList.length; b++) {
            if(stat2RankList[b] === stat2Rank) {
                stat2Count++
            }
        }
    
        for(let c = 0; c < stat3RankList.length; c++) {
            if(stat3RankList[c] === stat3Rank) {
                stat3Count++
            }
        }
    
        for(let d = 0; d < stat4RankList.length; d++) {
            if(stat4RankList[d] === stat4Rank) {
                stat4Count++
            }
        }
        
        for(let e = 0; e < stat5RankList.length; e++) {
            if(stat5RankList[e] === stat5Rank) {
                stat5Count++
            }
        }

        const sumRaw = raw.reduce((partialSum, a) => partialSum + a, 0)
        const giAdjusted = gi[rep] - sumRaw
    
        var stat1Gi = 0
        var stat2Gi = 0
        var stat3Gi = 0
        var stat4Gi = 0
        var stat5Gi = 0
    
        if(giAdjusted < stat1Rank) {
            stat1Gi = stat1Raw
        }
        if(stat1Count > (giAdjusted - stat1Rank) + 1) {
            stat1Gi = stat1Raw
        }
        else {
            stat1Gi = stat1Raw + 1
        }
    
        if(giAdjusted < stat2Rank) {
            stat2Gi = stat2Raw
        }
        if(stat2Count > (giAdjusted - stat2Rank) + 1) {
            stat2Gi = stat2Raw
        }
        else {
            stat2Gi = stat2Raw + 1
        }
    
        if(giAdjusted < stat3Rank) {
            stat3Gi = stat3Raw
        }
        if(stat3Count > (giAdjusted - stat3Rank) + 1) {
            stat3Gi = stat3Raw
        }
        else {
            stat3Gi = stat3Raw + 1
        }
    
        if(giAdjusted < stat4Rank) {
            stat4Gi = stat4Raw
        }
        if(stat4Count > (giAdjusted - stat4Rank) + 1) {
            stat4Gi = stat4Raw
        }
        else {
            stat4Gi = stat4Raw + 1
        }
    
        if(giAdjusted < stat5Rank) {
            stat5Gi = stat5Raw
        }
        if(stat5Count > (giAdjusted - stat5Rank) + 1) {
            stat5Gi = stat5Raw
        }
        else {
            stat5Gi = stat5Raw + 1
        }

        finalStats.push([stat1Gi, stat2Gi, stat3Gi, stat4Gi, stat5Gi])
    }

    if($('#con-loc').val() == '' || $('#pow-vel').val() == '' || $('#eye-sta').val() == '' || $('#spd-fb').val() == '' || $('#fld-brk').val() == '') {
        alert('Fill every stat input to continue')
        event.preventDefault()
    } else {
        const body = $('body')
        const form = $('form')
        const button = $('button')

        const spread = $('<div id="spread-table">')
        const colLabels = $('<div class="labels">')
        const colGi = $('<div class="gi">')
        const colStat1 = $('<div class="stat-1">')
        const colStat2 = $('<div class="stat-2">')
        const colStat3 = $('<div class="stat-3">')
        const colStat4 = $('<div class="stat-4">')
        const colStat5 = $('<div class="stat-5">')
        const colFinDom = $('<div class="fin-dom">')

        body.append(spread)

        $('#spread-table').append(colLabels)
        $('#spread-table').append(colGi)
        $('#spread-table').append(colStat1)
        $('#spread-table').append(colStat2)
        $('#spread-table').append(colStat3)
        $('#spread-table').append(colStat4)
        $('#spread-table').append(colStat5)
        $('#spread-table').append(colFinDom)

        $('.labels').append($('<div class="empty">').html(' '))
        $('.labels').append($('<div class="base-stats-label">').html('Base Stats'))
        
        $('.gi').append($('<div class="gi-stat-label">').html('GI'))
        $('.gi').append($('<div class="empty">').html(' '))
        
        $('.stat-1').append($('<div class="gi-stat-label">').html('CON/LOC'))
        $('.stat-1').append($('<div class="gi-stat">').html(stat1))

        $('.stat-2').append($('<div class="gi-stat-label">').html('POW/VEL'))
        $('.stat-2').append($('<div class="gi-stat">').html(stat2))

        $('.stat-3').append($('<div class="gi-stat-label">').html('EYE/STA'))
        $('.stat-3').append($('<div class="gi-stat">').html(stat3))

        $('.stat-4').append($('<div class="gi-stat-label">').html('SPD/FB'))
        $('.stat-4').append($('<div class="gi-stat">').html(stat4))

        $('.stat-5').append($('<div class="gi-stat-label">').html('FLD/BRK'))
        $('.stat-5').append($('<div class="gi-stat">').html(stat5))

        var finesseDominantStatus = '0'

        const finessePitcher = stat1 + stat5 - stat2 - stat4
        const dominantPitcher = stat2 + stat4 - stat1 - stat5
    
        if(finessePitcher > 0) {
            finesseDominantStatus = '+' + finessePitcher + ' FP'
        } else if(dominantPitcher > 0) {
            finesseDominantStatus = '+' + dominantPitcher + ' DP'
        }

        $('.fin-dom').append($('<div class="gi-stat-label">').html('FP/DP'))
        $('.fin-dom').append($('<div class="gi-stat">').html(finesseDominantStatus))

        for(let n = 0; n < gi.length; n++) {
            const finessePitcher = (stat1 + finalStats[n][0]) + (stat5 + finalStats[n][4]) - (stat2 + finalStats[n][1]) - (stat4 + finalStats[n][3])
            const dominantPitcher = (stat2 + finalStats[n][1]) + (stat4 + finalStats[n][3]) - (stat1 + finalStats[n][0]) - (stat5 + finalStats[n][4])
    
            if(finessePitcher > 0) {
                finesseDominantStatus = '+' + finessePitcher + ' FP'
            } else if(dominantPitcher > 0) {
                finesseDominantStatus = '+' + dominantPitcher + ' DP'
            }

            $('.labels').append($('<div class="gi-label-increment">').html('GI Increment'))
            $('.labels').append($('<div class="gi-label-stats">').html('<b>Total Stats</b>'))
    
            $('.gi').append($('<div class="gi-value">').html(gi[n]))
    
            $('.stat-1').append($('<div class="gi-stat-gi-dist">').html(finalStats[n][0]))
            $('.stat-1').append($('<div class="gi-stat-final">').html(`<b>${stat1 + finalStats[n][0]}</b>`))
    
            $('.stat-2').append($('<div class="gi-stat-gi-dist">').html(finalStats[n][1]))
            $('.stat-2').append($('<div class="gi-stat-final">').html(`<b>${stat2 + finalStats[n][1]}</b>`))
    
            $('.stat-3').append($('<div class="gi-stat-gi-dist">').html(finalStats[n][2]))
            $('.stat-3').append($('<div class="gi-stat-final">').html(`<b>${stat3 + finalStats[n][2]}</b>`))

            $('.stat-4').append($('<div class="gi-stat-gi-dist">').html(finalStats[n][3]))
            $('.stat-4').append($('<div class="gi-stat-final">').html(`<b>${stat4 + finalStats[n][3]}</b>`))

            $('.stat-5').append($('<div class="gi-stat-gi-dist">').html(finalStats[n][4]))
            $('.stat-5').append($('<div class="gi-stat-final">').html(`<b>${stat5 + finalStats[n][4]}</b>`))

            $('.fin-dom').append($('<div class="fin-dom-value">').html(finesseDominantStatus))
        }
        
        form.remove()
        button.remove()
    }
     
    event.preventDefault()
})

