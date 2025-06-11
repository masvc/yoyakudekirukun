import { useState, useEffect } from 'react';
import { Camera, MapPin, Calendar, Star, Phone, Plus, Wind, Mountain, Waves, ChevronRight, Award, Shield, Users } from 'lucide-react';
import { apiService, type CreateBookingRequest, type Booking, type Operator } from './services/api';

const DroneVideoApp = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [isLoading, setIsLoading] = useState(false);
  const [bookingData, setBookingData] = useState({
    sportType: '',
    planType: '',
    date: '',
    time: '',
    location: '',
    participants: 1,
    customerName: '',
    email: '',
    phone: '',
    skillLevel: '',
    requests: ''
  });

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [operators, setOperators] = useState<Operator[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // スライドショー用の画像
  const heroImages = [
    'https://picsum.photos/1920/1080?random=1',
    'https://picsum.photos/1920/1080?random=2', 
    'https://picsum.photos/1920/1080?random=3',
    'https://picsum.photos/1920/1080?random=4',
    'https://picsum.photos/1920/1080?random=5'
  ];
  useEffect(() => {
    if (currentView === 'management') {
      loadBookings();
      loadOperators();
    }
  }, [currentView]);

  const loadBookings = async () => {
    try {
      setIsLoading(true);
      const bookingsData = await apiService.getBookings();
      setBookings(bookingsData);
    } catch (error) {
      console.error('予約データの取得に失敗しました:', error);
      alert('予約データの取得に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  const loadOperators = async () => {
    try {
      const operatorsData = await apiService.getAvailableOperators();
      setOperators(operatorsData);
    } catch (error) {
      console.error('オペレーターデータの取得に失敗しました:', error);
    }
  };

  const sports = {
    skiing: {
      name: 'スキー',
      icon: Mountain,
      description: '雪山での迫力あるスキーシーンをドローンで撮影',
      locations: [
        '白馬八方尾根スキー場',
        'ニセコグラン・ヒラフ',
        '苗場スキー場',
        '志賀高原スキー場',
        'ルスツリゾート'
      ],
      plans: [
        {
          id: 'basic',
          name: 'ベーシックプラン',
          price: '¥45,000',
          duration: '2時間',
          videos: '編集済み動画1本',
          description: '基本的な滑走シーンを美しく撮影'
        },
        {
          id: 'standard',
          name: 'スタンダードプラン',
          price: '¥65,000',
          duration: '3時間',
          videos: '編集済み動画2本',
          description: '複数アングルでの撮影＋ハイライト動画'
        },
        {
          id: 'premium',
          name: 'プレミアムプラン',
          price: '¥85,000',
          duration: '4時間',
          videos: '編集済み動画3本',
          description: 'プロ仕様の撮影＋特殊エフェクト編集'
        }
      ]
    },
    golf: {
      name: 'ゴルフ',
      icon: Award,
      description: 'ゴルフコースでのプレーを上空から美しく記録',
      locations: [
        '富士カントリークラブ',
        '川奈ホテルゴルフコース',
        'PGMゴルフリゾート沖縄',
        '軽井沢72ゴルフ',
        '葛城ゴルフ倶楽部'
      ],
      plans: [
        {
          id: 'basic',
          name: 'ベーシックプラン',
          price: '¥35,000',
          duration: '2時間',
          videos: '編集済み動画1本',
          description: 'ティーショット中心の撮影'
        },
        {
          id: 'standard',
          name: 'スタンダードプラン',
          price: '¥55,000',
          duration: '3時間',
          videos: '編集済み動画2本',
          description: 'ラウンド全体の撮影＋ベストショット集'
        },
        {
          id: 'premium',
          name: 'プレミアムプラン',
          price: '¥75,000',
          duration: '4時間',
          videos: '編集済み動画3本',
          description: 'コース全景＋詳細解析動画付き'
        }
      ]
    },
    marine: {
      name: 'マリンスポーツ',
      icon: Waves,
      description: 'サーフィンやジェットスキーなど海でのスポーツを撮影',
      locations: [
        '湘南・江ノ島',
        '千葉・九十九里浜',
        '静岡・伊豆白浜',
        '和歌山・白良浜',
        '沖縄・恩納村'
      ],
      plans: [
        {
          id: 'basic',
          name: 'ベーシックプラン',
          price: '¥40,000',
          duration: '2時間',
          videos: '編集済み動画1本',
          description: '基本的な海上撮影'
        },
        {
          id: 'standard',
          name: 'スタンダードプラン',
          price: '¥60,000',
          duration: '3時間',
          videos: '編集済み動画2本',
          description: '複数アングル＋スローモーション撮影'
        },
        {
          id: 'premium',
          name: 'プレミアムプラン',
          price: '¥80,000',
          duration: '4時間',
          videos: '編集済み動画3本',
          description: '4K撮影＋プロ編集＋音楽付き'
        }
      ]
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitBooking = async () => {
    if (!bookingData.sportType || !bookingData.planType || !bookingData.date || !bookingData.customerName) {
      alert('必須項目を入力してください');
      return;
    }

    try {
      setIsLoading(true);
      const newBookingData: CreateBookingRequest = {
        customerName: bookingData.customerName,
        email: bookingData.email,
        phone: bookingData.phone,
        sportType: bookingData.sportType,
        planType: bookingData.planType,
        date: bookingData.date,
        time: bookingData.time,
        location: bookingData.location,
        participants: bookingData.participants,
        skillLevel: bookingData.skillLevel || undefined,
        requests: bookingData.requests || undefined
      };

      await apiService.createBooking(newBookingData);
      
      // フォームをリセット
      setBookingData({
        sportType: '',
        planType: '',
        date: '',
        time: '',
        location: '',
        participants: 1,
        customerName: '',
        email: '',
        phone: '',
        skillLevel: '',
        requests: ''
      });
      
      alert('予約が完了しました！オペレーターのアサインをお待ちください。');
      setCurrentView('landing');
    } catch (error) {
      console.error('予約の作成に失敗しました:', error);
      alert('予約の作成に失敗しました。もう一度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  const assignOperator = async (bookingId: number, operatorId: number) => {
    try {
      setIsLoading(true);
      await apiService.assignOperator(bookingId, operatorId);
      await loadBookings(); // 最新データを再取得
      alert('オペレーターがアサインされました！');
    } catch (error) {
      console.error('オペレーターのアサインに失敗しました:', error);
      alert('オペレーターのアサインに失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return '未アサイン';
      case 'assigned': return 'アサイン済み';
      case 'confirmed': return '確定済み';
      case 'completed': return '完了';
      case 'cancelled': return 'キャンセル';
      default: return status;
    }
  };

  const getSportDisplayName = (sportType: string) => {
    const sportKey = sportType as keyof typeof sports;
    return sports[sportKey]?.name || sportType;
  };

  const renderLandingPage = () => (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        {/* スライドショー背景 */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        {/* スライドインジケーター */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
        
        <div className="relative z-10 text-center max-w-4xl px-6">
          <Wind className="w-16 h-16 mx-auto mb-6 text-blue-400" />
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            スポーツの瞬間を
            <br />
            <span className="text-blue-400">空から撮影</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-90">
            最新のドローン技術で、あなたのプレーを最高のアングルから記録します
          </p>
          <button
            onClick={() => setCurrentView('booking')}
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-12 py-4 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl disabled:opacity-50"
          >
            {isLoading ? '処理中...' : '今すぐ予約する'}
            <ChevronRight className="inline w-5 h-5 ml-2" />
          </button>
        </div>
      </section>

      {/* 特徴セクション */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">なぜドローン撮影なのか</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <Camera className="w-16 h-16 mx-auto mb-6 text-blue-500" />
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">4K高画質撮影</h3>
              <p className="text-gray-600 leading-relaxed">
                最新の4Kカメラを搭載したドローンで、プロレベルの映像品質を実現
              </p>
            </div>
            <div className="text-center">
              <Wind className="w-16 h-16 mx-auto mb-6 text-blue-500" />
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">ユニークなアングル</h3>
              <p className="text-gray-600 leading-relaxed">
                従来では不可能だった上空からの迫力あるアングルでスポーツシーンを撮影
              </p>
            </div>
            <div className="text-center">
              <Shield className="w-16 h-16 mx-auto mb-6 text-blue-500" />
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">安全・確実</h3>
              <p className="text-gray-600 leading-relaxed">
                国家資格を持つ経験豊富なオペレーターが安全第一で撮影を実施
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* スポーツセクション */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">対応スポーツ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(sports).map(([key, sport]) => {
              const IconComponent = sport.icon;
              return (
                <div key={key} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="p-8 text-center">
                    <IconComponent className="w-16 h-16 mx-auto mb-6 text-blue-500" />
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{sport.name}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{sport.description}</p>
                    <button
                      onClick={() => {
                        setCurrentView('booking');
                        handleInputChange('sportType', key);
                      }}
                      disabled={isLoading}
                      className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50"
                    >
                      予約する
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 実績セクション */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-16">実績・信頼</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-200">撮影実績</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.8★</div>
              <div className="text-blue-200">平均評価</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-blue-200">安全記録</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24h</div>
              <div className="text-blue-200">動画納期</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderBookingForm = () => (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center mb-6">
        <button
          onClick={() => setCurrentView('landing')}
          disabled={isLoading}
          className="mr-4 p-2 text-gray-600 hover:text-blue-500 disabled:opacity-50"
        >
          ←
        </button>
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Wind className="mr-2 text-blue-500" />
          ドローン撮影予約
        </h2>
      </div>

      <div className="space-y-6">
        {/* スポーツ選択 */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">スポーツ種目 *</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(sports).map(([key, sport]) => {
              const IconComponent = sport.icon;
              return (
                <div 
                  key={key}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    bookingData.sportType === key 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-300'
                  } ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
                  onClick={() => {
                    if (!isLoading) {
                      handleInputChange('sportType', key);
                    }
                  }}
                >
                  <IconComponent className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                  <h3 className="font-semibold text-gray-800 text-center">{sport.name}</h3>
                </div>
              );
            })}
          </div>
        </div>

        {/* プラン選択 */}
        {bookingData.sportType && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">撮影プラン *</label>
            <div className="space-y-3">
              {sports[bookingData.sportType as keyof typeof sports].plans.map(plan => (
                <div 
                  key={plan.id}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    bookingData.planType === plan.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-300'
                  } ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
                  onClick={() => !isLoading && handleInputChange('planType', plan.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{plan.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{plan.description}</p>
                      <p className="text-xs text-gray-500 mt-2">{plan.duration} • {plan.videos}</p>
                    </div>
                    <p className="text-blue-600 font-bold text-lg">{plan.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 日時・場所 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">撮影日 *</label>
            <input
              type="date"
              value={bookingData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              disabled={isLoading}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">希望時間</label>
            <select
              value={bookingData.time}
              onChange={(e) => handleInputChange('time', e.target.value)}
              disabled={isLoading}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
            >
              <option value="">時間を選択</option>
              <option value="09:00">9:00</option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="13:00">13:00</option>
              <option value="14:00">14:00</option>
              <option value="15:00">15:00</option>
              <option value="16:00">16:00</option>
            </select>
          </div>
        </div>

        {/* 撮影場所 */}
        {bookingData.sportType && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">撮影場所</label>
            <select
              value={bookingData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              disabled={isLoading}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
            >
              <option value="">場所を選択</option>
              {sports[bookingData.sportType as keyof typeof sports].locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
              <option value="other">その他（相談）</option>
            </select>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">参加人数</label>
            <select
              value={bookingData.participants}
              onChange={(e) => handleInputChange('participants', parseInt(e.target.value))}
              disabled={isLoading}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
            >
              <option value={1}>1名</option>
              <option value={2}>2名</option>
              <option value={3}>3名</option>
              <option value={4}>4名</option>
              <option value={5}>5名以上</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">スキルレベル</label>
            <select
              value={bookingData.skillLevel}
              onChange={(e) => handleInputChange('skillLevel', e.target.value)}
              disabled={isLoading}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
            >
              <option value="">選択してください</option>
              <option value="beginner">初級</option>
              <option value="intermediate">中級</option>
              <option value="advanced">上級</option>
              <option value="professional">プロ</option>
            </select>
          </div>
        </div>

        {/* 撮影アンケート */}
        {/* {bookingData.sportType && bookingData.planType && (
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">撮影スタイル・アンケート</h3>
            
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">画角の希望</label>
              <div className="grid grid-cols-1 gap-3">
                {surveyOptions.cameraAngle.map(option => (
                  <div 
                    key={option.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      bookingData.cameraAngle === option.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300'
                    } ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
                    onClick={() => !isLoading && handleInputChange('cameraAngle', option.id)}
                  >
                    <h4 className="font-semibold text-gray-800">{option.label}</h4>
                    <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">撮影スタイル</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {surveyOptions.shootingStyle.map(option => (
                  <div 
                    key={option.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      bookingData.shootingStyle === option.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300'
                    } ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
                    onClick={() => !isLoading && handleInputChange('shootingStyle', option.id)}
                  >
                    <h4 className="font-semibold text-gray-800">{option.label}</h4>
                    <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">メインで撮りたい対象</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {surveyOptions.focusSubject.map(option => (
                  <div 
                    key={option.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      bookingData.focusSubject === option.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300'
                    } ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
                    onClick={() => !isLoading && handleInputChange('focusSubject', option.id)}
                  >
                    <h4 className="font-semibold text-gray-800">{option.label}</h4>
                    <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">特別なリクエスト（複数選択可）</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {surveyOptions.specialRequests.map(option => {
                  const isSelected = bookingData.specialRequests.includes(option.id);
                  return (
                    <div 
                      key={option.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-blue-300'
                      } ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
                      onClick={() => {
                        if (!isLoading) {
                          const currentRequests = bookingData.specialRequests;
                          let newRequests;
                          if (isSelected) {
                            newRequests = currentRequests.filter(id => id !== option.id);
                          } else {
                            newRequests = [...currentRequests, option.id];
                          }
                          handleInputChange('specialRequests', newRequests);
                        }
                      }}
                    >
                      <div className="flex items-start">
                        <div className={`w-4 h-4 rounded border-2 mr-3 mt-0.5 flex items-center justify-center ${
                          isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{option.label}</h4>
                          <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )} */}

        {/* お客様情報 */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">お客様情報</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">お名前 *</label>
              <input
                type="text"
                value={bookingData.customerName}
                onChange={(e) => handleInputChange('customerName', e.target.value)}
                disabled={isLoading}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">電話番号</label>
              <input
                type="tel"
                value={bookingData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                disabled={isLoading}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">メールアドレス</label>
            <input
              type="email"
              value={bookingData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              disabled={isLoading}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">撮影に関するご要望</label>
          <textarea
            value={bookingData.requests}
            onChange={(e) => handleInputChange('requests', e.target.value)}
            rows={4}
            disabled={isLoading}
            placeholder="特定のシーンや撮影スタイルのご希望があればお聞かせください"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
          />
        </div>

        <button
          onClick={handleSubmitBooking}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
        >
          {isLoading ? '予約中...' : '予約を確定する'}
        </button>
      </div>
    </div>
  );

  const renderBookingManagement = () => (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Calendar className="mr-2 text-blue-500" />
          予約管理
        </h2>
        <button
          onClick={loadBookings}
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? '更新中...' : '更新'}
        </button>
      </div>

      {isLoading && bookings.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-500">データを読み込んでいます...</div>
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-500">予約データがありません</div>
        </div>
      ) : (
        <div className="grid gap-6">
          {bookings.map(booking => (
            <div key={booking.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{booking.customerName}</h3>
                  <p className="text-gray-600">{getSportDisplayName(booking.sportType)} - {booking.planType}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  booking.status === 'pending' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : booking.status === 'assigned'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {getStatusText(booking.status)}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  {booking.date} {booking.time}
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {booking.location || '場所未指定'}
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  {booking.participants}名
                </div>
                <div className="flex items-center text-gray-600">
                  <Star className="w-4 h-4 mr-2" />
                  {booking.skillLevel || '未選択'}
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  {booking.phone || '未登録'}
                </div>
              </div>

              {booking.requests && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700"><strong>ご要望:</strong> {booking.requests}</p>
                </div>
              )}

              {booking.assignedOperator ? (
                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                  <img 
                    src={booking.assignedOperator.avatar} 
                    alt={booking.assignedOperator.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-semibold text-green-800">{booking.assignedOperator.name}</p>
                    <div className="flex items-center text-sm text-green-600">
                      <Star className="w-3 h-3 mr-1 text-yellow-500" />
                      {booking.assignedOperator.rating} • {booking.assignedOperator.experience} • {booking.assignedOperator.specialty}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-700 mb-3">オペレーターをアサイン</h4>
                  {operators.length === 0 ? (
                    <div className="text-gray-500 text-sm">利用可能なオペレーターがいません</div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {operators.map(operator => (
                        <div 
                          key={operator.id}
                          className={`flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${
                            isLoading ? 'opacity-50 pointer-events-none' : ''
                          }`}
                          onClick={() => !isLoading && assignOperator(booking.id, operator.id)}
                        >
                          <img 
                            src={operator.avatar} 
                            alt={operator.name}
                            className="w-8 h-8 rounded-full mr-3"
                          />
                          <div className="flex-1">
                            <p className="font-semibold text-gray-800 text-sm">{operator.name}</p>
                            <div className="flex items-center text-xs text-gray-600">
                              <Star className="w-3 h-3 mr-1 text-yellow-500" />
                              {operator.rating} • {operator.experience}
                            </div>
                            <p className="text-xs text-gray-500">{operator.specialty}</p>
                          </div>
                          <Plus className="w-4 h-4 text-blue-500" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => setCurrentView('landing')}
            >
              <Wind className="w-8 h-8 text-blue-500 mr-3" />
              <h1 className="text-2xl font-bold text-gray-800">SkyShot</h1>
            </div>
            <nav className="flex space-x-6">
              <button
                onClick={() => setCurrentView('landing')}
                disabled={isLoading}
                className={`px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 ${
                  currentView === 'landing' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 hover:text-blue-500'
                }`}
              >
                ホーム
              </button>
              <button
                onClick={() => setCurrentView('booking')}
                disabled={isLoading}
                className={`px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 ${
                  currentView === 'booking' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 hover:text-blue-500'
                }`}
              >
                予約
              </button>
              <button
                onClick={() => setCurrentView('management')}
                disabled={isLoading}
                className={`px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 ${
                  currentView === 'management' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 hover:text-blue-500'
                }`}
              >
                管理
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className={currentView === 'landing' ? '' : 'py-8'}>
        {currentView === 'landing' && renderLandingPage()}
        {currentView === 'booking' && renderBookingForm()}
        {currentView === 'management' && renderBookingManagement()}
      </main>
    </div>
  );
};

export default DroneVideoApp;