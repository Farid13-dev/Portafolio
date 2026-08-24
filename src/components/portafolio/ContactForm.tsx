'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Linkedin, Github, CheckCircle2, ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import { Profile, SectionHeaderData } from '@/hooks/use-portafolio-data';
import { buildWhatsappLink } from '@/lib/whatsapp';

interface ContactFormProps {
    profile: Profile | undefined;
    header?: SectionHeaderData;
}

interface FieldRules {
    min: number;
    max: number;
    message: string;
}

interface ValidationErrors {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
}

const FIELD_VALIDATION: Record<string, FieldRules> = {
    name: { min: 10, max: 100, message: 'El nombre debe tener al menos 10 caracteres' },
    subject: { min: 15, max: 200, message: 'El asunto debe tener al menos 15 caracteres' },
    message: { min: 100, max: 5000, message: 'El mensaje debe tener al menos 100 caracteres' },
};

const EMAIL_MAX = 254;

function validateField(key: string, value: string): string | undefined {
    const rules = FIELD_VALIDATION[key];
    if (!rules) return undefined;
    if (value.trim().length < rules.min) return rules.message;
    if (value.trim().length > rules.max) return `Máximo ${rules.max} caracteres`;
    return undefined;
}

function validateEmail(email: string): string | undefined {
    if (!email.trim()) return 'El email es requerido';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Ingresa un email válido';
    if (email.length > EMAIL_MAX) return `Máximo ${EMAIL_MAX} caracteres`;
    return undefined;
}

export function ContactForm({ profile, header }: ContactFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        website: '',
    });
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const errors = useMemo<ValidationErrors>(() => ({
        name: touched.name ? validateField('name', formData.name) : undefined,
        email: touched.email ? validateEmail(formData.email) : undefined,
        subject: touched.subject ? validateField('subject', formData.subject) : undefined,
        message: touched.message ? validateField('message', formData.message) : undefined,
    }), [formData, touched]);

    const isValid = useMemo(() => {
        return (
            !validateField('name', formData.name) &&
            !validateEmail(formData.email) &&
            !validateField('subject', formData.subject) &&
            !validateField('message', formData.message)
        );
    }, [formData]);

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (status === 'error') setStatus('idle');
    };

    const handleBlur = (field: string) => {
        setTouched(prev => ({ ...prev, [field]: true }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setTouched({ name: true, email: true, subject: true, message: true });

        if (!isValid) {
            setStatus('error');
            setErrorMessage('Por favor corrige los errores del formulario antes de enviar.');
            return;
        }

        setStatus('loading');
        setErrorMessage('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'No se pudo enviar el mensaje');
            }

            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '',website: '' });
            setTouched({});

            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            setStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Ocurrió un error inesperado');
        }
    };

    const whatsappLink = buildWhatsappLink(profile);

    const inputClass = (field: keyof ValidationErrors) =>
        errors[field] ? 'border-destructive focus-visible:ring-destructive' : '';

    return (
        <section className="bg-background py-20" id="contacto">
            <div className="container lg:px-8 mx-auto px-4 sm:px-6">
                <div className="mb-16 text-center">
                    <h2 className="font-bold mb-4 text-4xl">
                        <span className="text-primary">{header?.title ?? 'Contáctame'}</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-muted-foreground text-xl whitespace-pre-line">
                        {(header?.description ?? '¿Hablamos?\nEstoy disponible para oportunidades laborales y proyectos de desarrollo backend.').replace(/\\n/g, '\n')}
                    </p>
                </div>

                <div className="gap-8 grid max-w-4xl md:grid-cols-2 mx-auto">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <Card className="border-2">
                            <CardHeader>
                                <CardTitle className="text-xl">Información de Contacto</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {profile?.email && (
                                    <div className="flex gap-4 items-start">
                                        <div className="bg-primary/10 flex flex-shrink-0 h-10 items-center justify-center rounded-lg w-10">
                                            <Mail className="h-5 text-primary w-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Email</p>
                                            <a className="hover:text-primary text-muted-foreground" href={`mailto:${profile.email}`}>
                                                {profile.email}
                                            </a>
                                        </div>
                                    </div>
                                )}
                                {profile?.phone && (
                                    <div className="flex gap-4 items-start">
                                        <div className="bg-primary/10 flex flex-shrink-0 h-10 items-center justify-center rounded-lg w-10">
                                            <Phone className="h-5 text-primary w-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Teléfono</p>
                                            <a className="hover:text-primary text-muted-foreground" href={whatsappLink} rel="noopener noreferrer" target="_blank">
                                                {profile.phone}
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {profile?.linkedin && (
                                    <div className="flex gap-4 items-start">
                                        <div className="bg-primary/10 flex flex-shrink-0 h-10 items-center justify-center rounded-lg w-10">
                                            <Linkedin className="h-5 text-primary w-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium">LinkedIn</p>
                                            <a className="hover:text-primary text-muted-foreground" href={profile.linkedin} rel="noopener noreferrer" target="_blank">
                                                linkedin.com/in/oliver-rodriguez-a30629326
                                            </a>
                                        </div>
                                    </div>
                                )}
                                {profile?.github && (
                                    <div className="flex gap-4 items-start">
                                        <div className="bg-primary/10 flex flex-shrink-0 h-10 items-center justify-center rounded-lg w-10">
                                            <Github className="h-5 text-primary w-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium">GitHub</p>
                                            <a className="hover:text-primary text-muted-foreground" href={profile.github} rel="noopener noreferrer" target="_blank">
                                                github.com/Farid13-dev
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="bg-primary/5 border-2">
                            <CardHeader>
                                <CardTitle className="text-xl">Disponibilidad</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Actualmente disponible para proyectos freelance y oportunidades de empleo a tiempo completo.
                                </p>
                                <div className="flex gap-2 items-center mt-4 text-primary">
                                    <CheckCircle2 className="h-5 w-5" />
                                    <span className="font-medium">Disponible para nuevos proyectos</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Form */}
                    <Card className="border-2">
                        <CardHeader>
                            <CardTitle className="text-xl">Envíame un Mensaje</CardTitle>
                            <CardDescription>Completa el formulario y te responderé pronto</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <input
                                    autoComplete="off"
                                    className="absolute h-0 left-0 opacity-0 top-0 w-0"
                                    name="website"
                                    onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                                    tabIndex={-1}
                                    type="text"
                                    value={(formData as Record<string, string>).website || ''}
                                />
                                <div>
                                    <label className="block font-medium mb-2 text-sm" htmlFor="name">Nombre</label>
                                    <Input
                                        className={inputClass('name')}
                                        disabled={status === 'loading'}
                                        id="name"
                                        onBlur={() => handleBlur('name')}
                                        onChange={(e) => handleChange('name', e.target.value)}
                                        placeholder="Tu nombre completo"
                                        required
                                        value={formData.name}
                                    />
                                    {errors.name && (
                                        <p className="flex gap-1 items-center mt-1 text-destructive text-xs">
                                            <AlertCircle className="h-3 w-3" /> {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block font-medium mb-2 text-sm" htmlFor="email">Email</label>
                                    <Input
                                        className={inputClass('email')}
                                        disabled={status === 'loading'}
                                        id="email"
                                        onBlur={() => handleBlur('email')}
                                        onChange={(e) => handleChange('email', e.target.value)}
                                        placeholder="tu@email.com"
                                        required
                                        type="email"
                                        value={formData.email}
                                    />
                                    {errors.email && (
                                        <p className="flex gap-1 items-center mt-1 text-destructive text-xs">
                                            <AlertCircle className="h-3 w-3" /> {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block font-medium mb-2 text-sm" htmlFor="subject">Asunto</label>
                                    <Input
                                        className={inputClass('subject')}
                                        disabled={status === 'loading'}
                                        id="subject"
                                        onBlur={() => handleBlur('subject')}
                                        onChange={(e) => handleChange('subject', e.target.value)}
                                        placeholder="Asunto del mensaje"
                                        required
                                        value={formData.subject}
                                    />
                                    {errors.subject && (
                                        <p className="flex gap-1 items-center mt-1 text-destructive text-xs">
                                            <AlertCircle className="h-3 w-3" /> {errors.subject}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block font-medium mb-2 text-sm" htmlFor="message">Mensaje</label>
                                    <Textarea
                                        className={`h-32 overflow-y-auto resize-none ${inputClass('message')}`}
                                        disabled={status === 'loading'}
                                        id="message"
                                        onBlur={() => handleBlur('message')}
                                        onChange={(e) => handleChange('message', e.target.value)}
                                        placeholder="Cuéntame brevemente sobre tu proyecto, idea o necesidad..."
                                        required
                                        value={formData.message}
                                    />
                                    <div className="flex justify-between mt-1">
                                        {errors.message ? (
                                            <p className="flex gap-1 items-center text-destructive text-xs">
                                                <AlertCircle className="h-3 w-3" /> {errors.message}
                                            </p>
                                        ) : (
                                            <span />
                                        )}
                                        <span className={`text-xs ${formData.message.length > FIELD_VALIDATION.message.max ? 'text-destructive' : 'text-muted-foreground'}`}>
                      {formData.message.length}/{FIELD_VALIDATION.message.max}
                    </span>
                                    </div>
                                </div>

                                {status === 'success' && (
                                    <div className="bg-green-50 dark:bg-green-950/30 flex gap-2 items-center p-3 rounded-md text-green-600 text-sm">
                                        <CheckCircle2 className="flex-shrink-0 h-4 w-4" />
                                        ¡Mensaje enviado con éxito! Te contactaré pronto.
                                    </div>
                                )}

                                {status === 'error' && errorMessage && (
                                    <div className="bg-destructive/10 p-3 rounded-md text-destructive text-sm">
                                        {errorMessage}
                                    </div>
                                )}

                                <Button className="w-full" disabled={status === 'loading' || (status !== 'success' && !isValid)} size="lg" type="submit">
                                    {status === 'loading' ? (
                                        <>
                                            <Loader2 className="animate-spin h-4 mr-2 w-4" />
                                            Enviando...
                                        </>
                                    ) : (
                                        <>
                                            Enviar Mensaje
                                            <ChevronRight className="h-4 ml-2 w-4" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}