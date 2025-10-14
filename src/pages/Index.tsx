import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Index = () => {
  const [fromCurrency, setFromCurrency] = useState('USDT');
  const [toCurrency, setToCurrency] = useState('RUB');
  const [amount, setAmount] = useState('1000');

  const exchangeRates = {
    'USDT-RUB': 92.5,
    'USDT-EUR-CASH': 0.92,
    'USDT-EUR-CARD': 0.91,
    'RUB-EUR-CASH': 0.0099,
    'RUB-EUR-CARD': 0.0098,
    'RUB-USDT': 0.0108,
    'EUR-CASH-USDT': 1.087,
    'EUR-CASH-RUB': 101.2,
    'EUR-CARD-USDT': 1.099,
    'EUR-CARD-RUB': 102.1,
  };

  const currencies = [
    { value: 'USDT', label: 'USDT', icon: 'Bitcoin' },
    { value: 'RUB', label: 'Рубль', icon: 'Coins' },
    { value: 'EUR-CASH', label: 'Евро (наличные)', icon: 'Banknote' },
    { value: 'EUR-CARD', label: 'Евро (безнал)', icon: 'CreditCard' },
  ];

  const getRate = (from: string, to: string): number => {
    const key = `${from}-${to}`;
    return exchangeRates[key as keyof typeof exchangeRates] || 1;
  };

  const calculateExchange = () => {
    const rate = getRate(fromCurrency, toCurrency);
    const result = parseFloat(amount) * rate;
    return result.toFixed(2);
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const topRates = [
    { from: 'USDT', to: 'RUB', rate: 92.5, trend: 'up' },
    { from: 'USDT', to: 'EUR (нал)', rate: 0.92, trend: 'down' },
    { from: 'RUB', to: 'EUR (безнал)', rate: 0.0098, trend: 'up' },
    { from: 'EUR (нал)', to: 'RUB', rate: 101.2, trend: 'up' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-dark-blue to-background">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-16 text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan via-primary to-gold bg-clip-text text-transparent">
            CRYPTO EXCHANGE
          </h1>
          <p className="text-xl text-muted-foreground">
            Офлайн обмен USDT • Рубль • Евро
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 animate-fade-in-up hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/20 rounded-lg">
                <Icon name="Calculator" className="text-primary" size={28} />
              </div>
              <h2 className="text-3xl font-bold">Калькулятор обмена</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-muted-foreground">Отдаёте</label>
                <div className="flex gap-3">
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-2xl font-semibold h-14 bg-background/50"
                    placeholder="0.00"
                  />
                  <Select value={fromCurrency} onValueChange={setFromCurrency}>
                    <SelectTrigger className="w-[200px] h-14 bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((curr) => (
                        <SelectItem key={curr.value} value={curr.value}>
                          <div className="flex items-center gap-2">
                            <Icon name={curr.icon as any} size={18} />
                            {curr.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={swapCurrencies}
                  className="rounded-full h-12 w-12 border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300"
                >
                  <Icon name="ArrowUpDown" className="text-primary" size={20} />
                </Button>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-muted-foreground">Получаете</label>
                <div className="flex gap-3">
                  <Input
                    type="text"
                    value={calculateExchange()}
                    readOnly
                    className="text-2xl font-semibold h-14 bg-primary/10 border-primary/30"
                  />
                  <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger className="w-[200px] h-14 bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((curr) => (
                        <SelectItem key={curr.value} value={curr.value}>
                          <div className="flex items-center gap-2">
                            <Icon name={curr.icon as any} size={18} />
                            {curr.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-4">
                <div className="flex justify-between text-sm text-muted-foreground mb-4">
                  <span>Курс обмена</span>
                  <span className="font-semibold text-primary">
                    1 {fromCurrency} = {getRate(fromCurrency, toCurrency).toFixed(4)} {toCurrency}
                  </span>
                </div>
                <Button className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-cyan to-primary hover:opacity-90 transition-opacity">
                  Обменять
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gold/20 rounded-lg">
                <Icon name="TrendingUp" className="text-gold" size={28} />
              </div>
              <h2 className="text-3xl font-bold">Актуальные курсы</h2>
            </div>

            <div className="space-y-4">
              {topRates.map((rate, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                        {rate.from.substring(0, 1)}
                      </div>
                      <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
                      <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center font-bold text-gold">
                        {rate.to.substring(0, 1)}
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-sm">
                        {rate.from} → {rate.to}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">{rate.rate}</div>
                    <div className={`flex items-center gap-1 text-xs ${rate.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      <Icon name={rate.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={14} />
                      {rate.trend === 'up' ? '+0.3%' : '-0.2%'}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-gold/10 border border-primary/30">
              <div className="flex items-start gap-3">
                <Icon name="Info" className="text-primary mt-1" size={20} />
                <div className="text-sm">
                  <p className="font-semibold mb-1">Курсы обновляются каждые 5 минут</p>
                  <p className="text-muted-foreground">Офлайн обмен доступен в наших офисах</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: 'Shield',
              title: 'Безопасность',
              desc: 'Проверенный обменник с гарантией',
              color: 'primary'
            },
            {
              icon: 'Zap',
              title: 'Быстрый обмен',
              desc: 'Операции за 5-10 минут',
              color: 'gold'
            },
            {
              icon: 'Percent',
              title: 'Лучший курс',
              desc: 'Минимальная комиссия на рынке',
              color: 'cyan'
            }
          ].map((feature, index) => (
            <Card
              key={index}
              className="p-6 text-center bg-card/30 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`inline-flex p-4 rounded-full bg-${feature.color}/20 mb-4`}>
                <Icon name={feature.icon as any} className={`text-${feature.color}`} size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
