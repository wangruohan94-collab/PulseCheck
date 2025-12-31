// 问卷数据
const questions = [
    {
        id: 1,
        text: "在一节课中保持专心的时间比例大约是",
        subtitle: "1为完全听不进课，5为注意力高度集中",
        type: "scale",
        options: [
            { value: 1, label: "完全听不进课" },
            { value: 2, label: "注意力较差" },
            { value: 3, label: "注意力一般" },
            { value: 4, label: "注意力较好" },
            { value: 5, label: "注意力高度集中" }
        ]
    },
    {
        id: 2,
        text: "放学时的疲劳程度",
        type: "scale",
        options: [
            { value: 1, label: "完全不累" },
            { value: 2, label: "有点累" },
            { value: 3, label: "中等疲劳" },
            { value: 4, label: "很累" },
            { value: 5, label: "极度疲劳" }
        ]
    },
    {
        id: 3,
        text: "开始写作业的时间",
        subtitle: "跟之前相比是否有拖延情况",
        type: "binary",
        options: [
            { value: 1, label: "跟之前一样，没有拖延" },
            { value: 2, label: "有拖延情况" }
        ]
    },
    {
        id: 4,
        text: "一般拖延多久",
        type: "scale",
        options: [
            { value: 1, label: "不拖延" },
            { value: 2, label: "< 30分钟" },
            { value: 3, label: "30分钟-1小时" },
            { value: 4, label: "1-2小时" },
            { value: 5, label: "> 2小时" }
        ]
    },
    {
        id: 5,
        text: "星期天晚上的感觉",
        subtitle: "1为负面情绪，5为正面情绪",
        type: "scale",
        options: [
            { value: 1, label: "情绪非常负面" },
            { value: 2, label: "情绪比较负面" },
            { value: 3, label: "情绪一般" },
            { value: 4, label: "情绪比较正面" },
            { value: 5, label: "情绪非常正面" }
        ]
    },
    {
        id: 6,
        text: "有没有喜欢的学科（包括美术、音乐）",
        type: "binary",
        options: [
            { value: 1, label: "有喜欢的学科" },
            { value: 2, label: "没有喜欢的学科" }
        ]
    },
    {
        id: 7,
        text: "听到新任务的感觉",
        subtitle: "1为负面情绪，5为正面情绪",
        type: "scale",
        options: [
            { value: 1, label: "情绪非常负面" },
            { value: 2, label: "情绪比较负面" },
            { value: 3, label: "情绪一般" },
            { value: 4, label: "情绪比较正面" },
            { value: 5, label: "情绪非常正面" }
        ]
    },
    {
        id: 8,
        text: "完成当日任务后的感受",
        subtitle: "1为负面情绪，5为正面情绪",
        type: "scale",
        options: [
            { value: 1, label: "情绪非常负面" },
            { value: 2, label: "情绪比较负面" },
            { value: 3, label: "情绪一般" },
            { value: 4, label: "情绪比较正面" },
            { value: 5, label: "情绪非常正面" }
        ]
    },
    {
        id: 9,
        text: "你对自己有期待吗",
        type: "binary",
        options: [
            { value: 1, label: "有期待" },
            { value: 2, label: "没有期待" }
        ]
    },
    {
        id: 10,
        text: "得到老师表扬的感觉",
        subtitle: "1为非常不满意，5为非常满意",
        type: "scale",
        options: [
            { value: 1, label: "非常不满意" },
            { value: 2, label: "比较不满意" },
            { value: 3, label: "一般" },
            { value: 4, label: "比较满意" },
            { value: 5, label: "非常满意" }
        ]
    }
];

// 全局变量
let currentQuestion = 0;
let answers = {};
let radarChart = null;

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    loadSavedData();
});

// 初始化动画
function initializeAnimations() {
    anime({
        targets: '.fade-in',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        delay: anime.stagger(200),
        easing: 'easeOutQuart'
    });
}

// 开始问卷
function startSurvey() {
    document.getElementById('intro-section').classList.add('hidden');
    document.getElementById('question-section').classList.remove('hidden');
    showQuestion(0);
}

// 显示题目
function showQuestion(index) {
    currentQuestion = index;
    const question = questions[index];
    const container = document.getElementById('question-content');
    
    // 更新进度
    updateProgress();
    
    // 生成题目HTML
    let html = `
        <div class="mb-8">
            <h3 class="text-2xl font-bold text-gray-800 mb-2">
                第${question.id}题
            </h3>
            <p class="text-lg text-gray-700 mb-2">${question.text}</p>
            ${question.subtitle ? `<p class="text-sm text-gray-500 mb-6">${question.subtitle}</p>` : ''}
        </div>
        <div class="space-y-3">
    `;
    
    question.options.forEach((option, optionIndex) => {
        const isSelected = answers[question.id] === option.value;
        html += `
            <button onclick="selectAnswer(${question.id}, ${option.value})" 
                    class="option-button w-full p-4 text-left rounded-lg border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 ${isSelected ? 'selected' : 'bg-white'}">
                <div class="flex items-center">
                    <div class="w-6 h-6 rounded-full border-2 ${isSelected ? 'border-white bg-white' : 'border-gray-300'} mr-3 flex items-center justify-center">
                        ${isSelected ? '<div class="w-3 h-3 rounded-full bg-blue-600"></div>' : ''}
                    </div>
                    <span class="font-medium">${option.label}</span>
                </div>
            </button>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
    
    // 更新按钮状态
    updateButtonStates();
    
    // 添加动画
    anime({
        targets: '#question-content',
        opacity: [0, 1],
        translateX: [20, 0],
        duration: 500,
        easing: 'easeOutQuart'
    });
}

// 选择答案
function selectAnswer(questionId, value) {
    answers[questionId] = value;
    
    // 更新UI
    const buttons = document.querySelectorAll('.option-button');
    buttons.forEach((button, index) => {
        const optionValue = questions[currentQuestion].options[index].value;
        if (optionValue === value) {
            button.classList.add('selected');
        } else {
            button.classList.remove('selected');
        }
    });
    
    // 启用下一题按钮
    document.getElementById('next-btn').disabled = false;
    
    // 自动保存
    saveData();
}

// 上一题
function previousQuestion() {
    if (currentQuestion > 0) {
        showQuestion(currentQuestion - 1);
    }
}

// 下一题
function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        showQuestion(currentQuestion + 1);
    } else {
        // 完成问卷
        completeSurvey();
    }
}

// 更新进度
function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progress-bar').style.width = progress + '%';
    document.getElementById('progress-text').textContent = `${currentQuestion + 1} / ${questions.length}`;
}

// 更新按钮状态
function updateButtonStates() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.disabled = !answers[questions[currentQuestion].id];
    
    if (currentQuestion === questions.length - 1) {
        nextBtn.textContent = '完成问卷';
    } else {
        nextBtn.textContent = '下一题';
    }
}

// 完成问卷
function completeSurvey() {
    // 计算结果
    const results = calculateResults();
    
    // 显示结果
    showResults(results);
    
    // 保存到本地存储
    saveResults(results);
}

// 计算结果
function calculateResults() {
    // 维度定义
    const dimensions = {
        '注意力': [1], // 第1题
        '疲劳程度': [2], // 第2题
        '拖延行为': [3, 4], // 第3、4题
        '情绪状态': [5, 7, 8], // 第5、7、8题
        '学习动机': [6, 9, 10] // 第6、9、10题
    };
    
    const scores = {};
    let totalScore = 0;
    let maxScore = 0;
    
    // 计算各维度得分
    Object.keys(dimensions).forEach(dimension => {
        let dimensionScore = 0;
        let dimensionMax = 0;
        
        dimensions[dimension].forEach(questionId => {
            const answer = answers[questionId];
            if (answer !== undefined) {
                // 标准化分数（转换为0-100分制）
                let normalizedScore;
                if (questionId === 3 || questionId === 6 || questionId === 9) {
                    // 反向计分题
                    normalizedScore = answer === 1 ? 100 : 0;
                } else {
                    normalizedScore = ((answer - 1) / 4) * 100;
                }
                
                dimensionScore += normalizedScore;
                dimensionMax += 100;
            }
        });
        
        const dimensionAverage = dimensionMax > 0 ? (dimensionScore / dimensionMax) * 100 : 0;
        scores[dimension] = Math.round(dimensionAverage);
        
        totalScore += dimensionAverage;
        maxScore += 100;
    });
    
    const overallScore = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
    
    // 确定倦怠等级
    let level, levelText, levelColor;
    if (overallScore >= 80) {
        level = 'high';
        levelText = '高度倦怠';
        levelColor = '#ef4444';
    } else if (overallScore >= 60) {
        level = 'medium';
        levelText = '中度倦怠';
        levelColor = '#f59e0b';
    } else if (overallScore >= 40) {
        level = 'low';
        levelText = '轻度倦怠';
        levelColor = '#10b981';
    } else {
        level = 'none';
        levelText = '状态良好';
        levelColor = '#059669';
    }
    
    return {
        overallScore,
        level,
        levelText,
        levelColor,
        scores,
        answers: { ...answers }
    };
}

// 显示结果
function showResults(results) {
    document.getElementById('question-section').classList.add('hidden');
    document.getElementById('results-section').classList.remove('hidden');
    
    // 显示结果摘要
    const summaryHtml = `
        <div class="text-center">
            <div class="text-6xl font-bold mb-4" style="color: ${results.levelColor}">
                ${results.overallScore}
            </div>
            <div class="text-2xl font-bold mb-2" style="color: ${results.levelColor}">
                ${results.levelText}
            </div>
            <p class="text-gray-600">
                您的学业倦怠综合评分为 ${results.overallScore} 分（满分100分）
            </p>
        </div>
    `;
    document.getElementById('result-summary').innerHTML = summaryHtml;
    
    // 创建雷达图
    createRadarChart(results.scores);
    
    // 显示详细分析
    showDetailedAnalysis(results);
    
    // 显示建议
    showSuggestions(results);
    
    // 添加动画
    anime({
        targets: '#results-section > *',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        delay: anime.stagger(200),
        easing: 'easeOutQuart'
    });
}

// 创建雷达图
function createRadarChart(scores) {
    const chartDom = document.getElementById('radar-chart');
    radarChart = echarts.init(chartDom);
    
    const option = {
        tooltip: {
            trigger: 'item'
        },
        radar: {
            indicator: Object.keys(scores).map(key => ({
                name: key,
                max: 100
            })),
            radius: '70%',
            axisName: {
                color: '#374151',
                fontSize: 14
            },
            splitArea: {
                areaStyle: {
                    color: ['#f8fafc', '#f1f5f9']
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#cbd5e1'
                }
            }
        },
        series: [{
            name: '学业倦怠评估',
            type: 'radar',
            data: [{
                value: Object.values(scores),
                name: '您的得分',
                areaStyle: {
                    color: 'rgba(44, 82, 130, 0.3)'
                },
                lineStyle: {
                    color: '#2c5282',
                    width: 2
                },
                itemStyle: {
                    color: '#2c5282'
                }
            }]
        }]
    };
    
    radarChart.setOption(option);
    
    // 响应式
    window.addEventListener('resize', () => {
        if (radarChart) {
            radarChart.resize();
        }
    });
}

// 显示详细分析
function showDetailedAnalysis(results) {
    const container = document.getElementById('detailed-analysis');
    let html = '';
    
    Object.keys(results.scores).forEach(dimension => {
        const score = results.scores[dimension];
        let level, levelColor, description;
        
        if (score >= 80) {
            level = '严重';
            levelColor = '#ef4444';
            description = getDescription(dimension, 'high');
        } else if (score >= 60) {
            level = '较重';
            levelColor = '#f59e0b';
            description = getDescription(dimension, 'medium');
        } else if (score >= 40) {
            level = '轻微';
            levelColor = '#10b981';
            description = getDescription(dimension, 'low');
        } else {
            level = '良好';
            levelColor = '#059669';
            description = getDescription(dimension, 'none');
        }
        
        html += `
            <div class="bg-gray-50 rounded-lg p-6">
                <div class="flex justify-between items-center mb-3">
                    <h4 class="text-lg font-bold text-gray-800">${dimension}</h4>
                    <span class="px-3 py-1 rounded-full text-sm font-medium" style="background-color: ${levelColor}20; color: ${levelColor}">
                        ${level} (${score}分)
                    </span>
                </div>
                <p class="text-gray-600">${description}</p>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// 获取维度描述
function getDescription(dimension, level) {
    const descriptions = {
        '注意力': {
            'high': '注意力严重不集中，很难专注于学习内容，需要采取有效的注意力训练方法。',
            'medium': '注意力时有分散，需要改善学习环境和方法，提高专注力。',
            'low': '注意力基本正常，偶尔会有分心情况，可以通过简单的训练进一步提升。',
            'none': '注意力状态良好，能够很好地专注于学习任务。'
        },
        '疲劳程度': {
            'high': '学习疲劳程度严重，需要充分休息和调整作息，避免过度疲劳影响身心健康。',
            'medium': '学习疲劳程度较重，建议适当减轻学习负担，增加休息时间。',
            'low': '学习疲劳程度轻微，注意劳逸结合即可。',
            'none': '学习疲劳程度正常，精力充沛，学习状态良好。'
        },
        '拖延行为': {
            'high': '拖延行为严重，需要制定明确的学习计划，培养良好的时间管理习惯。',
            'medium': '拖延行为较明显，建议分解任务，设定小目标，逐步改善。',
            'low': '偶有拖延行为，可以通过简单的自我监督来改善。',
            'none': '基本没有拖延行为，学习习惯良好。'
        },
        '情绪状态': {
            'high': '情绪状态较差，学习过程中负面情绪较多，需要关注心理健康。',
            'medium': '情绪状态有所波动，建议学习适当的情绪调节方法。',
            'low': '情绪状态基本稳定，偶尔会有负面情绪。',
            'none': '情绪状态良好，对学习保持积极态度。'
        },
        '学习动机': {
            'high': '学习动机严重不足，对学习缺乏兴趣和期待，需要重新激发学习热情。',
            'medium': '学习动机较低，建议寻找学习的意义和乐趣，设定明确目标。',
            'low': '学习动机一般，可以通过设定小目标来提升动力。',
            'none': '学习动机良好，对学习有明确的期待和目标。'
        }
    };
    
    return descriptions[dimension][level];
}

// 显示建议
function showSuggestions(results) {
    const container = document.getElementById('suggestions');
    const suggestions = generateSuggestions(results);
    
    let html = '';
    suggestions.forEach(suggestion => {
        html += `
            <div class="flex items-start space-x-3">
                <div class="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                <p class="text-gray-700">${suggestion}</p>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// 生成建议
function generateSuggestions(results) {
    const suggestions = [];
    
    // 基于总体得分的一般建议
    if (results.overallScore >= 80) {
        suggestions.push('您的学业倦怠程度较高，建议寻求专业的心理咨询帮助。');
        suggestions.push('考虑与学校心理老师或专业心理咨询师沟通，制定个性化的改善计划。');
    } else if (results.overallScore >= 60) {
        suggestions.push('您的学业倦怠程度中等，需要及时调整学习状态和生活方式。');
        suggestions.push('建议制定合理的学习计划，平衡学习与休息时间。');
    } else if (results.overallScore >= 40) {
        suggestions.push('您的学业倦怠程度较轻，注意保持良好的学习习惯即可。');
        suggestions.push('可以尝试一些放松技巧，如深呼吸、冥想等，帮助缓解学习压力。');
    } else {
        suggestions.push('您的学习状态良好，请继续保持！');
        suggestions.push('可以分享您的学习经验，帮助其他同学改善学习状态。');
    }
    
    // 基于具体维度的针对性建议
    Object.keys(results.scores).forEach(dimension => {
        const score = results.scores[dimension];
        if (score >= 60) {
            switch (dimension) {
                case '注意力':
                    suggestions.push('尝试番茄工作法：25分钟专注学习，5分钟休息，提高注意力集中时间。');
                    break;
                case '疲劳程度':
                    suggestions.push('确保充足的睡眠时间（8-10小时），适当进行体育锻炼，缓解身体疲劳。');
                    break;
                case '拖延行为':
                    suggestions.push('将大任务分解为小目标，每完成一个小目标就给予自己适当奖励。');
                    break;
                case '情绪状态':
                    suggestions.push('学习情绪调节技巧，如正念冥想、写日记等，保持积极心态。');
                    break;
                case '学习动机':
                    suggestions.push('重新思考学习的意义，设定明确的短期和长期目标，寻找学习的乐趣。');
                    break;
            }
        }
    });
    
    return suggestions;
}

// 重新开始问卷
function restartSurvey() {
    // 重置数据
    currentQuestion = 0;
    answers = {};
    
    // 重置UI
    document.getElementById('results-section').classList.add('hidden');
    document.getElementById('intro-section').classList.remove('hidden');
    
    // 清除本地存储
    localStorage.removeItem('survey_answers');
    localStorage.removeItem('survey_results');
}

// 保存数据到本地存储
function saveData() {
    localStorage.setItem('survey_answers', JSON.stringify(answers));
}

// 加载保存的数据
function loadSavedData() {
    const saved = localStorage.getItem('survey_answers');
    if (saved) {
        answers = JSON.parse(saved);
        // 检查是否已完成问卷
        if (Object.keys(answers).length === questions.length) {
            const results = calculateResults();
            showResults(results);
        }
    }
}

// 保存结果
function saveResults(results) {
    const timestamp = new Date().toISOString();
    const data = {
        timestamp,
        results,
        answers: { ...answers }
    };
    
    // 保存到本地存储
    localStorage.setItem('survey_results', JSON.stringify(data));
    
    // 添加到历史记录
    const history = JSON.parse(localStorage.getItem('survey_history') || '[]');
    history.push(data);
    
    // 只保留最近10次记录
    if (history.length > 10) {
        history.shift();
    }
    
    localStorage.setItem('survey_history', JSON.stringify(history));
}