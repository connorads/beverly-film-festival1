'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Shield, Lock, FileText, AlertCircle, Cookie, User } from 'lucide-react'

export default function PoliciesPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            Policies & Legal
          </h1>
          <p className="text-xl text-muted-foreground">
            Important information about using our services
          </p>
        </div>

        {/* Policies Tabs */}
        <Tabs defaultValue="terms" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="terms">Terms of Service</TabsTrigger>
            <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
            <TabsTrigger value="cookies">Cookie Policy</TabsTrigger>
          </TabsList>

          {/* Terms of Service */}
          <TabsContent value="terms" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Terms of Service
                </CardTitle>
                <CardDescription>
                  Last updated: January 1, 2024
                </CardDescription>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                <h3>1. Acceptance of Terms</h3>
                <p>
                  By accessing and using the Beverly Hills Film Festival website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations.
                </p>

                <h3>2. Festival Tickets & Passes</h3>
                <p>
                  All ticket and pass purchases are final. Refunds are available only if requested at least 7 days before the festival start date. The festival reserves the right to change the program, venues, or screening times without notice.
                </p>

                <h3>3. Film Submissions</h3>
                <p>
                  By submitting a film to the Beverly Hills Film Festival, you confirm that:
                </p>
                <ul>
                  <li>You have the rights to submit the film for consideration</li>
                  <li>The festival may use excerpts for promotional purposes</li>
                  <li>Submission fees are non-refundable</li>
                  <li>Selection decisions are final and not subject to appeal</li>
                </ul>

                <h3>4. Intellectual Property</h3>
                <p>
                  All content on this website, including text, graphics, logos, and images, is the property of Beverly Hills Film Festival or its content suppliers and is protected by copyright laws.
                </p>

                <h3>5. Code of Conduct</h3>
                <p>
                  Festival attendees agree to behave respectfully and professionally. The festival reserves the right to remove anyone who violates our code of conduct without refund.
                </p>

                <h3>6. Limitation of Liability</h3>
                <p>
                  The Beverly Hills Film Festival shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services or attendance at festival events.
                </p>

                <h3>7. Photography & Recording</h3>
                <p>
                  By attending the festival, you consent to being photographed, filmed, or recorded. The festival may use these materials for promotional purposes without compensation.
                </p>

                <h3>8. Changes to Terms</h3>
                <p>
                  We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Policy */}
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Privacy Policy
                </CardTitle>
                <CardDescription>
                  Last updated: January 1, 2024
                </CardDescription>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                <h3>1. Information We Collect</h3>
                <p>
                  We collect information you provide directly to us, including:
                </p>
                <ul>
                  <li>Name, email address, and contact information</li>
                  <li>Payment and billing information</li>
                  <li>Film submission details</li>
                  <li>Communication preferences</li>
                </ul>

                <h3>2. How We Use Your Information</h3>
                <p>
                  We use the information we collect to:
                </p>
                <ul>
                  <li>Process ticket purchases and film submissions</li>
                  <li>Send festival updates and promotional materials</li>
                  <li>Improve our services and user experience</li>
                  <li>Comply with legal obligations</li>
                </ul>

                <h3>3. Information Sharing</h3>
                <p>
                  We do not sell, trade, or rent your personal information. We may share information with:
                </p>
                <ul>
                  <li>Service providers who assist in our operations</li>
                  <li>Festival sponsors and partners (with your consent)</li>
                  <li>Law enforcement when required by law</li>
                </ul>

                <h3>4. Data Security</h3>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>

                <h3>5. Your Rights</h3>
                <p>
                  You have the right to:
                </p>
                <ul>
                  <li>Access your personal information</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                </ul>

                <h3>6. Children's Privacy</h3>
                <p>
                  Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13.
                </p>

                <h3>7. International Data Transfers</h3>
                <p>
                  Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers.
                </p>

                <h3>8. Contact Us</h3>
                <p>
                  For privacy-related questions, please contact us at privacy@bhfilmfest.com.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cookie Policy */}
          <TabsContent value="cookies" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cookie className="h-5 w-5" />
                  Cookie Policy
                </CardTitle>
                <CardDescription>
                  Last updated: January 1, 2024
                </CardDescription>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                <h3>1. What Are Cookies</h3>
                <p>
                  Cookies are small text files stored on your device when you visit our website. They help us provide you with a better experience.
                </p>

                <h3>2. Types of Cookies We Use</h3>
                <h4>Essential Cookies</h4>
                <p>
                  Required for the website to function properly. These cannot be disabled.
                </p>

                <h4>Analytics Cookies</h4>
                <p>
                  Help us understand how visitors interact with our website by collecting anonymous information.
                </p>

                <h4>Marketing Cookies</h4>
                <p>
                  Used to track visitors across websites to display relevant advertisements.
                </p>

                <h4>Preference Cookies</h4>
                <p>
                  Remember your preferences and choices, such as language or region.
                </p>

                <h3>3. Third-Party Cookies</h3>
                <p>
                  Some cookies are placed by third-party services that appear on our pages, including:
                </p>
                <ul>
                  <li>Google Analytics for usage statistics</li>
                  <li>Social media platforms for sharing features</li>
                  <li>Payment processors for secure transactions</li>
                </ul>

                <h3>4. Managing Cookies</h3>
                <p>
                  You can control and delete cookies through your browser settings. Note that disabling cookies may impact website functionality.
                </p>

                <h3>5. Cookie Duration</h3>
                <p>
                  Session cookies are deleted when you close your browser. Persistent cookies remain on your device for a set period or until manually deleted.
                </p>

                <h3>6. Updates to This Policy</h3>
                <p>
                  We may update this cookie policy periodically. Check this page for the latest information on our cookie practices.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Additional Legal Information */}
        <Card className="mt-8 border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
              <AlertCircle className="h-5 w-5" />
              Important Legal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>
              <strong>Dispute Resolution:</strong> Any disputes arising from these terms shall be resolved through binding arbitration in Los Angeles County, California.
            </p>
            <p>
              <strong>Film Rights:</strong> Filmmakers retain all rights to their submitted films. The festival only requires limited screening and promotional rights.
            </p>
            <p>
              <strong>Force Majeure:</strong> The festival is not liable for cancellations or changes due to circumstances beyond our control, including but not limited to natural disasters, pandemics, or government restrictions.
            </p>
            <p>
              <strong>Contact:</strong> For legal inquiries, please contact legal@bhfilmfest.com
            </p>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card className="mt-8 bg-muted/50">
          <CardHeader>
            <CardTitle>Related Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <a href="/contact" className="flex items-center gap-2 text-sm text-primary hover:underline">
                <User className="h-4 w-4" />
                Contact Our Team
              </a>
              <a href="/faq" className="flex items-center gap-2 text-sm text-primary hover:underline">
                <AlertCircle className="h-4 w-4" />
                Frequently Asked Questions
              </a>
              <a href="/press" className="flex items-center gap-2 text-sm text-primary hover:underline">
                <FileText className="h-4 w-4" />
                Press Resources
              </a>
              <a href="/sponsors" className="flex items-center gap-2 text-sm text-primary hover:underline">
                <Shield className="h-4 w-4" />
                Sponsorship Information
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}